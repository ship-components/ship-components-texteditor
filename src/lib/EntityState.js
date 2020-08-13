import { EntityInstance, SelectionState, ContentState } from 'draft-js';
import Immutable from 'immutable';

export default class EntityState extends Immutable.Record({
  entity: null,
  entityKey: null,
  entitySelection: null
}) {
  /**
   * Create a new state from EditorState
   *
   * @param {ContentState} contentState
   * @param {SelectionState} selectionState
   * @return {EntityState}
   */
  static create(contentState, selectionState) {
    // Find active entity
    const blockKey = selectionState.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const entityKey = selectionState.isCollapsed()
      ? block.getEntityAt(selectionState.getStartOffset() - 1)
      : block.getEntityAt(selectionState.getStartOffset());
    const entity = entityKey
      ? contentState.getEntity(entityKey)
      : null;
    // Create selection around entity
    let entitySelection = null;
    block.findEntityRanges(
      (character) => character.getEntity() !== null,
      (start, end) => {
        if (block.getEntityAt(start) === entityKey) {
          entitySelection = new SelectionState({
            anchorKey: blockKey,
            anchorOffset: start,
            focusKey: blockKey,
            focusOffset: end
          });
        }
      }
    );
    // Create instance
    return new EntityState({
      entity,
      entityKey,
      entitySelection
    });
  }

  /**
   * Get active entity instance
   *
   * @return {EntityInstance|null}
   */
  getEntity() {
    return this.entity;
  }

  /**
   * Get active entity key
   *
   * @return {String|null}
   */
  getEntityKey() {
    return this.entityKey;
  }

  /**
   * Get selection around active entity
   *
   * @return {SelectionState|null}
   */
  getEntitySelection() {
    return this.entitySelection;
  }

  /**
   * Check that the active entity's type is matching with the passed parameter
   *
   * @param {String} type 
   * @return {Boolean}
   */
  isEntityType(type) {
    return this.entity && this.entity.getType() === type ? true : false;
  }
}
