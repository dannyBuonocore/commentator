
module.exports = {

  getFileType: function() {
    return atom.workspace.getActiveTextEditor()
      .buffer.file.path.split('.').pop()
  }

};
