angular.module('viewCustom').factory('sectionOrdering', function() {
  return function (sections) {
    if(!sections) return false;
    
    var numSections = sections.length;
    if(!(numSections > 0)) return false;

    // Check if there is a 'details' section.
    var filterResult = sections.filter(function(s) {return s.serviceName === 'details';} );
    if(filterResult.length !== 1 ) return false;
    var detailsSection = filterResult[0];

    var index = sections.indexOf(detailsSection);
    
    // Remove the 'details' section from the array.
    sections.splice(index,1);

    // Append the 'details' section to the array.
    sections.splice(numSections, 0, detailsSection);
    
    return true;
  };
});