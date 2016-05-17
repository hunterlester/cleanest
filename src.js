function flattenStructure(structure) {
    if(structure.__proto__ == Array.prototype) {
      let structureObj = {};

      if(!structure.length) {
        return {};
      } else {
        structure.map(function(entry) {
            if(entry.__proto__ == Object.prototype) {
              structureObj = Object.assign({}, structureObj, {[entry._id]: flattenStructure(entry)})
            } else {
              structureObj = Object.assign({}, structureObj, {[entry]: entry});
            }
        })
      }

      return structureObj;

    } else if (structure.__proto__ == Object.prototype) {
      let structureObj = {};

      Object.keys(structure).map(function(key) {
          if(structure[key].__proto__ == Array.prototype) {
              structureObj = Object.assign({}, structure, structureObj, {[key]: flattenStructure(structure[key])});
          }
      });
      return structureObj;

    }
}
