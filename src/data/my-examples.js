import { Observable } from 'rxjs';
import { evolve, merge } from 'ramda';

export const myExamples = {

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
