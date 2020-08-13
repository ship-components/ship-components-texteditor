// Example entity types for suggestions
export const entities = new Immutable.List([
  {
    type: 'MENTION',
    label: 'Rick Sanchez',
    value: '@rick'
  },
  {
    type: 'MENTION',
    label: 'Morty Smith',
    value: '@morty'
  },
  {
    type: 'HASHTAG',
    label: '#rick',
    value: '#rick'
  },
  {
    type: 'HASHTAG',
    label: '#morty',
    value: '#morty'
  }
]);

// Entities to convert when regex matches in content
export const convertEntities = new Immutable.List([
  {
    regex: /\B@([a-z0-9-_.]+\b)?/gi,
    convert: (text, isSelected) => {
      // If text is selected, mark matched text as a suggestion
      if (isSelected) {
        return {
          text,
          type: 'SUGGESTION',
          mutability: 'MUTABLE'
        };
      }
      // If mention is in the list, mark text as a mention
      const mentioned = entities.find(mention =>
        mention.type === 'MENTION' && mention.value === text
      );
      if (mentioned) {
        return {
          text: mentioned.label,
          type: 'MENTION',
          mutability: 'SEGMENTED'
        };
      }
      // Otherwise, keep it as regular text
    }
  },
  {
    regex: /\B#(?:[a-z0-9_]+\b)?/gi,
    convert: (text, isSelected) => {
      // If text is selected, mark matched text as a suggestion
      if (isSelected) {
        return {
          text,
          type: 'SUGGESTION',
          mutability: 'MUTABLE'
        };
      }
      // Otherwise, mark it as a hashtag
      return {
        text: text,
        type: 'HASHTAG',
        mutability: 'IMMUTABLE'
      };
    }
  }
]);
