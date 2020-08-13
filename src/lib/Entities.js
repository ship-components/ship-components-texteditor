import Immutable from 'immutable';

const Entities = {
  Link: 'LINK',
  Suggestion: 'SUGGESTION',
  Mention: 'MENTION',
  Hashtag: 'HASHTAG'
};

export class EntityDecorator extends Immutable.Record({
  regex: undefined,
  render: undefined
}) {}

export default Entities;
