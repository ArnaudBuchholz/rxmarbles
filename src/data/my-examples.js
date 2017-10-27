import { Observable } from 'rxjs';
import { evolve, merge } from 'ramda';

export const myExamples = {

  "A = B + C": {
    label: "A = B + C",
    inputs: [
      [{t:5, c:2}, {t:15, c:30}, {t:25, c:22}, {t:35, c:5}, {t:45, c:60}, {t:55, c:1}, 80],
      [{t:5, c:1}, {t:15, c:2}, {t:25, c:3}, {t:35, c:4}, {t:65, c:5}, 70]
    ],
    apply: function(inputs) {
      return Observable.combineLatest(inputs[0], inputs[1],
        (x, y) => x.content + y.content
      );
    }
  },

  "Initial stream": {
    label: "",
    inputs: [
      [{t:0, c:0}, {t:10, c:"1"}, {t:20, c:"foo"}, {t:30, c:2}, {t:40, c:3}, {t:50, c:"5"}, {t:60, c:"bar"},
         {t:70, c:7}, {t:80, c:11}, {t:90, c:13}, 95],
    ],
    apply: function(inputs) {
      return inputs[0];
    }
  },

  "Mapping with parseInt": {
    label: ".map(x => parseInt(x, 10))",
    inputs: [
      [{t:0, c:0}, {t:10, c:"1"}, {t:20, c:"foo"}, {t:30, c:2}, {t:40, c:3}, {t:50, c:"5"}, {t:60, c:"bar"},
        {t:70, c:7}, {t:80, c:11}, {t:90, c:13}, 95],
    ],
    apply: function(inputs) {
      return inputs[0].map(evolve({ content: x => parseInt(x, 10) }));
    }
  },

  "Removing NaN": {
    label: ".map(x => parseInt(x, 10))\n.filter(x => !isNaN(x))",
    inputs: [
      [{t:0, c:0}, {t:10, c:"1"}, {t:20, c:"foo"}, {t:30, c:2}, {t:40, c:3}, {t:50, c:"5"}, {t:60, c:"bar"},
        {t:70, c:7}, {t:80, c:11}, {t:90, c:13}, 95],
    ],
    apply: function(inputs) {
      return inputs[0]
        .map(evolve({ content: x => parseInt(x, 10) }))
        .filter(x => !isNaN(x.content));
    }
  },

  "Reduce": {
    label: ".map(x => parseInt(x, 10))\n.filter(x => !isNaN(x))\n.reduce((total, x) => total + x)",
    inputs: [
      [{t:0, c:0}, {t:10, c:"1"}, {t:20, c:"foo"}, {t:30, c:2}, {t:40, c:3}, {t:50, c:"5"}, {t:60, c:"bar"},
        {t:70, c:7}, {t:80, c:11}, {t:90, c:13}, 95],
    ],
    apply: function(inputs) {
      return inputs[0]
        .map(evolve({ content: x => parseInt(x, 10) }))
        .filter(x => !isNaN(x.content))
        .reduce((total, x) =>
          merge(total, { content: total.content + x.content, id: total.id + x.id })
        );
    }
  }

}
