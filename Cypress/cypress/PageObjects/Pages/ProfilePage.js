class ProfilePage {

  elements = {
    // Visiting My Info Tab
    myInfoTab: () => cy.contains('', ''),

    // Test Case 2 & 3
    personalTab: () => cy.contains('' , ''),
    firstNameField: () => cy.get(''),
    saveButton: () => cy.get(''),

    // Test Case 4
    contactTab: () => cy.contains('' , ''),
    emergencyTab: () => cy.contains('' , ''),

    // Test Case 5 & 6 & 7 & 8 & 9
    dependentsTab: () => cy.contains('' , ''),
    addDependentButton: () => cy.contains('', '').parents('').find(''),
    relationDropdown: () => cy.get('').contains('').parents('').find(''),
    dependentName: () =>cy.get('').contains('').parents('').find(''),


    // Test Case 7 & 8
    tbaleOfDependents: () => cy.get('').eq(0).find('').eq(0),
    confirmDeleteButton: () => cy.get('').should(''),
    
    // Test Case 9
    addAttachmentButton: () => cy.contains('', '').parents('').find(''),

    // Test Case 10
    commentAreaButton: () => cy.get(''),
    
  };

  // Test Case 1: Verify New Qualification Could be added to the record of user
  myInfoTabAppear() {
  }

  // Test Case 2
  checkRequiredFieldError(comment) {
  }

  // Test Case 3
  editProfileName(uniqueName) {
  }

  // Test Case 4 in Three parts
  checkPersonalTab() {
  }
  checkContactTab() {
  }
  checkEmergencyTab() {
  }

  // Test Case 5
  assignDependentRecord(uniqueName) {
  }

  // Test Case 6
  checkRelationOtherInputBar() {
  }

  // Test Case 7
  editDependentRecord(uniqueName) {
  }

  // Test Case 8
  deleteDependentRecord(uniqueName){
  }

  // Test Case 9
  uploadDependentPDF(fileName) {
  }

  // Test Case 10
  checkForCommentLengthErrord(maxLengthComment) {
  }
}

export default ProfilePage;
