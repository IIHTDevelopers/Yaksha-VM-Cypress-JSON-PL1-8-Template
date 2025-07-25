class ProfilePage {

  elements = {
    // Visiting My Info Tab
    myInfoTab: () => cy.contains('span.oxd-main-menu-item--name', 'My Info'),

    // Test Case 2 & 3
    personalTab: () => cy.contains('a.orangehrm-tabs-item' , 'Personal Details'),
    firstNameField: () => cy.get('input[name="firstName"]'),
    saveButton: () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space'),

    // Test Case 4
    contactTab: () => cy.contains('a.orangehrm-tabs-item' , 'Contact Details'),
    emergencyTab: () => cy.contains('a.orangehrm-tabs-item' , 'Emergency Contacts'),

    // Test Case 5 & 6 & 7 & 8 & 9
    dependentsTab: () => cy.contains('a.orangehrm-tabs-item' , 'Dependents'),
    addDependentButton: () => cy.contains('h6', 'Assigned Dependents').parents('[class*=orangehrm-action-header]').find('button'),
    relationDropdown: () => cy.get('label').contains('Relationship').parents('.oxd-grid-item').find('.oxd-select-text'),
    dependentName: () =>cy.get('label').contains('Name').parents('.oxd-input-group').find('input'),


    // Test Case 7 & 8
    tbaleOfDependents: () => cy.get('.orangehrm-container').eq(0).find('.oxd-table-card').eq(0),
    confirmDeleteButton: () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--label-danger.orangehrm-button-margin').should('be.visible'),
    
    // Test Case 9
    addAttachmentButton: () => cy.contains('h6', 'Attachments').parents('[class*=orangehrm-action-header]').find('button'),

    // Test Case 10
    commentAreaButton: () => cy.get('textarea[placeholder="Type comment here"]'),
    
  };

  // Test Case 1: Verify New Qualification Could be added to the record of user
  myInfoTabAppear() {
    // Visiting The MyInfo Tab
    this.elements.myInfoTab().click();
    cy.wait(2000);

  }

  // Test Case 2
  checkRequiredFieldError(comment) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    
    this.elements.personalTab().click();
    cy.wait(2000);

    this.elements.firstNameField().clear();

  }

  // Test Case 3
  editProfileName(uniqueName) {

    this.elements.myInfoTab().click();
    cy.wait(2000);
    // going to Qualification Module
    this.elements.personalTab().click();
    cy.wait(1000);

    // Edit Unique name
    this.elements.firstNameField().clear().type(uniqueName);

    this.elements.saveButton().eq(0).click();
  }

  // Test Case 4 in Three parts
  checkPersonalTab() {
    this.elements.myInfoTab().click();
    cy.wait(1000);
    
    this.elements.personalTab().click();
  }
  checkContactTab() {
    this.elements.myInfoTab().click();
    cy.wait(1000);
    
    this.elements.contactTab().click();
  }
  checkEmergencyTab() {
    this.elements.myInfoTab().click();
    cy.wait(1000);
    
    this.elements.emergencyTab().click();
  }

  // Test Case 5
  assignDependentRecord(uniqueName) {
    this.elements.myInfoTab().click();
    cy.wait(1000);
    
    this.elements.dependentsTab().click();
    cy.wait(2000);

    this.elements.addDependentButton().click();


    this.elements.dependentName().type(uniqueName);

    this.elements.relationDropdown().click();
    cy.get('.oxd-select-dropdown > div').eq(1).click();

    // Save Button
    this.elements.saveButton().eq(0).click();
    
  }

  // Test Case 6
  checkRelationOtherInputBar() {
    this.elements.myInfoTab().click();
    cy.wait(1000);
    
    cy.contains('Please Specify').should('not.exist');
    
    this.elements.dependentsTab().click();
    cy.wait(2000);

    // Got To Dependents Tab
    this.elements.addDependentButton().click();

    // Opt for Other Relation Type
    this.elements.relationDropdown().click();
    cy.get('.oxd-select-dropdown > div').eq(2).click();

    
  }

  // Test Case 7
  editDependentRecord(uniqueName) {
    this.elements.myInfoTab().click();
    cy.wait(1000);
    
    this.elements.dependentsTab().click();
    cy.wait(2000);

    // this.elements.addDependentButton().click();

    // Click on edit Button
    this.elements.tbaleOfDependents().find('i.oxd-icon.bi-pencil-fill').click();

    // Updating The new Name
    this.elements.dependentName().clear().type(uniqueName);

    // save button
    this.elements.saveButton().click();
  }

  // Test Case 8
  deleteDependentRecord(uniqueName){
    this.elements.myInfoTab().click();
    cy.wait(1000);
    
    this.elements.dependentsTab().click();
    cy.wait(2000);

    this.elements.addDependentButton().click();


    this.elements.dependentName().type(uniqueName);

    this.elements.relationDropdown().click();
    cy.get('.oxd-select-dropdown > div').eq(1).click();

    // Save Button
    this.elements.saveButton().eq(0).click();

    // check for it is Updated
    cy.contains(uniqueName).should('be.visible');

    // Delete First Record
    this.elements.tbaleOfDependents().find('i.oxd-icon.bi-trash').click();

    // Delete confirmation
    this.elements.confirmDeleteButton().click();
  }

  // Test Case 9
  uploadDependentPDF(fileName) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    
    this.elements.dependentsTab().click();
    cy.wait(2000);
    
    this.elements.addAttachmentButton().click();
    cy.wait(2000);

    cy.get('input[type="file"].oxd-file-input')
      .should('exist')
      .selectFile(`cypress/fixtures/${fileName}`, { force: true });


    // SAve the detail 
    this.elements.saveButton().click();

  }

  // Test Case 10
  checkForCommentLengthErrord(maxLengthComment) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    
    this.elements.dependentsTab().click();
    cy.wait(2000);
    
    this.elements.addAttachmentButton().click();
    cy.wait(2000);

    // Adding The comment more than 200 Characters
    this.elements.commentAreaButton().clear().type(maxLengthComment);

  }
}

export default ProfilePage;
