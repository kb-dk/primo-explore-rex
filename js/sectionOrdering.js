/**
 * Service to reorder the sections in the full view.
 */
export class SectionOrderingService {
  /**
   *  Reorder the sections in the full view.
   *  @param {Array} sections - An array of section objects.  
   *  @throws {Error} If the fullview sections cannot be found.  
   *  @return {boolean} A boolean value specifying if the ordering 
   *  has taken place.
   */
  orderSections(sections) {
    if (!sections || !sections.length || !(sections.length > 0))
      throw new Error('Full view sections could not be found.');
    
    this.moveToBottomIfExists('links', sections);
    this.moveToBottomIfExists('virtualBrowse', sections);
    this.moveToBottomIfExists('details', sections);
  };

  moveToBottomIfExists(sectionId, sections) {
    let section = sections.find(s => s.scrollId === sectionId );
    if (section)
      this.moveToBottom(section, sections);
  }

  moveToBottom(section, sections) {
    // Remove the section.
    sections.splice(sections.indexOf(section), 1);
    // Append the section to the end.
    sections.splice(sections.length, 0, section);
  }

};