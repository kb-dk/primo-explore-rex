/**
 * Service to reorder the sections in the full view.
 */
export class SectionOrderingService {
  constructor() {
  };

  _moveSectionToBottom(sections, section) {
    // Remove the section.
    sections.splice(sections.indexOf(section), 1);
    // Append the section to the end.
    sections.splice(sections.length, 0, section);
  }

  /**
   *  Function to reorder the sections in the full view.
   *  @param {Array} sections - An array of section objects.  
   *  @return {boolean} A boolean value specifying if the ordering 
   *  has taken place.
   */
  orderSections(sections) {
    if (!sections || !sections.length || !(sections.length > 0))
      return false;

    // If there is a 'Links' section, move it to the bottom.
    let linksSection = sections.find((s) => {
      return s.scrollId === 'links';
    });
    if (linksSection)
      this._moveSectionToBottom(sections, linksSection);

    // If there is a 'Virtual Browse' section, move it to the bottom.
    let virtualBrowseSection = sections.find((s) => {
      return s.scrollId === 'virtualBrowse';
    });
    if (virtualBrowseSection)
      this._moveSectionToBottom(sections, virtualBrowseSection);

    // If there is a 'Details' section, move it to the bottom.
    let detailsSection = sections.find((s) => {
      return s.scrollId === 'details';
    });
    if (detailsSection)
      this._moveSectionToBottom(sections, detailsSection);

    return true;
  };

};