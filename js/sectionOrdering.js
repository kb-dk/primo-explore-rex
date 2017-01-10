/**
  * Service to reorder the sections in the full view.
  */
angular.module('viewCustom').factory('sectionOrdering', function() {

  function moveSectionToBottom(sections, section) {
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
  return function(sections) {
    if (!sections || !sections.length || !(sections.length > 0))
      return false;

    // If there is a 'Links' section, move it to the bottom.
    var linksSection = sections.find((s) => {
      return s.scrollId === 'links';
    });
    if (linksSection)
      moveSectionToBottom(sections, linksSection);

    // If there is a 'Virtual Browse' section, move it to the bottom.
    var virtualBrowseSection = sections.find((s) => {
      return s.scrollId === 'virtualBrowse';
    });
    if (virtualBrowseSection)
      moveSectionToBottom(sections, virtualBrowseSection);

    // If there is a 'Details' section, move it to the bottom.
    var detailsSection = sections.find((s) => {
      return s.scrollId === 'details';
    });
    if (detailsSection)
      moveSectionToBottom(sections, detailsSection);

    return true;
  };

});