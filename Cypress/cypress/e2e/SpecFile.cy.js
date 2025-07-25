import LoginPage from '../PageObjects/Pages/LoginProfilePage';
import ProfilePage from '../PageObjects/Pages/ProfilePage';


describe('Automation Suite for Yaksha Application', () => {
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();


  beforeEach(() => {
    // Visit the Login Page before each test
    loginPage.performLogin(); 

  });

  // Test Case 1
  it('Test Case-1: Verify the "My Info" tab Loads Successfully ', () => {
    // Start
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.myInfoTabAppear();
      })
      .then(() => {
        verifyMyInfoTabAppear(); // Verify My Info Tab Appears
      });
  });

  // Test Case 2
  it('Test Case-2: Verify the "Required" field error Message is displayed on leaving name field blank', () => {
    // Start
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.checkRequiredFieldError();
      })
      .then(() => {
        verifyRequiredFieldError(); // Verify Required Field Error Displayed
      });
  });

  // Test Case 3
  it('Test Case-3: Verify the name gets edited successfully', () => {
    // Start
    const uniqueName = "gpa_&" + Date.now();
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.editProfileName(uniqueName);
      })
      .then(() => {
        verifyEditProfileName(uniqueName); // Verif Emp Name get edited Succesfully
      });
  });

  // Test Case 4
  it('Test Case-4: Verify the "My Info" tabs subtabs have unique URL ', () => {
    // Start
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.checkPersonalTab();
      })
      .then(() => {
        verifyPersonalTab(); // verify Personal Details Tab Have Unique Link
      })
      .then(() => {
        // Check Contact Detail Tab
        profilePage.checkContactTab();
      })
      .then(() => {
        // Verify Contact Detail Tab
        verifyContactTab(); // verify Contact Details Tab Have Unique Link

      })
      .then(() => {
        // Verify Emergenct Contacts Tab
        profilePage.checkEmergencyTab();

      })
      .then(() => {
        // Verify Emergenct Detail Tab
        verifyEmergenctTab(); // verify Emergency Contacts Tab Have Unique Link

      })
      
  });
  
  it('Test Case-5: Verify new Dependant could be added to the list', () => {
    // Start
    // Added Unique Name for Assertion
    const uniqueName = "Name_&" + Date.now();
   
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.assignDependentRecord(uniqueName);
      })
      .then(() => {
        verifyDependentRecordAdded(uniqueName); // Verify Child Dependent Added Or Not
      });
  });


  // Test Case 6
  it('Test Case-6: Verify new Dependant Specify inputbar only displays when Other option is selected from the relationship dropdown', () => {
    // Start
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.checkRelationOtherInputBar();
      })
      .then(() => {
        verifyOtherRelationInput(); // Verify Other Relationship option Visible or not 
      });
  });

  // Test Case 7
  it('Test Case-7: Verify the dependants could be edited from the list ', () => {
    // Start
    // Added Unique Name for Assertion
    const uniqueName = "Name_&" + Date.now();
    // ------------
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.editDependentRecord(uniqueName);
      })
      .then(() => {
        verifyEditDependentRecord(uniqueName); // Verify Dependent should be edited
      });
  });

  // Test Case 8
  it('Test Case-8 : Verify the dependants could be deleted from the list ', () => {
    // Start
    // Added Unique Name for Assertion
    const uniqueName = "Name_&" + Date.now();
    // ------------
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.deleteDependentRecord(uniqueName);
      })
      .then(() => {
        verifyDependentRecordDelete(uniqueName); // Verify Assigned Dependent Record Deleted
      });
  });


  // Test Case 9
  it('Test Case-9: Verify the sample pdf file could be uploaded in the attachments ', () => {
    // Start
    const fileName = 'TestCase_9.pdf'
    cy.wrap(null).then(() => {
      // Navigate to Profile Page & Performing Actions
      profilePage.uploadDependentPDF(fileName);

    }).then(() => {
      cy.wait(2000);
      verifyDependentPDFUploaded(fileName); // Verify PDF Succesfully Uploaded
      });

    });


  // Test Case 10
  it('Test Case-10: Verify the Comment inputbar has limit on length' , () => {
    // Start
    /// Random Comment having 201 Charcter for getting the length Error 
    const maxLengthComment = Array.from({length: 201}, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');

    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page & Performing Actions
        profilePage.checkForCommentLengthErrord(maxLengthComment);
      })
      .then(() => {
        verifyCommentLengthError(); // Verify Comment length Error Happening
      });
  });


  // ---------------------- Helper Functions ----------------------

});



// Helper function moved outside the describe block
// Test Case 1: Verify the 'My Info' tab Loads Successfully
function verifyMyInfoTabAppear() {
  cy.url().should('include', 'pim/viewPersonalDetails/empNumber/');
  cy.contains('Personal Details').should('be.visible');
};

// Test Case 2: Verif Required Field Error Occurs
function verifyRequiredFieldError(comment) {
  cy.get('span.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').contains('Required').should('be.visible');
};

// Test Case 3: Verify Edi Profile Happens
function verifyEditProfileName(uniqueName) {
  cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Updated');
  cy.reload();
  cy.get('p.oxd-userdropdown-name').contains(uniqueName).should('be.visible');
}


// Test Case 4: Verify Mulitple Tabs Unique Links
function verifyPersonalTab() {
  cy.wait(2000);
  cy.url().should('include', 'pim/viewPersonalDetails/empNumber/');
}
function verifyContactTab() {
  cy.wait(2000);
  cy.url().should('include', 'pim/contactDetails/empNumber/');
}
function verifyEmergenctTab() {
  cy.wait(2000);
  cy.url().should('include', 'pim/viewEmergencyContacts/empNumber/');
}

// Test Case 5: Verify Dependent record is Added
function verifyDependentRecordAdded(uniqueName) {
  // Check For Success Toast And Data Row Visibility
  cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Saved');
  cy.contains(uniqueName).should('be.visible');
}

// Test Case 6 : Verify Other Relation Link Appears
function verifyOtherRelationInput() {
  // Check For Other Relation Field
  cy.contains('Please Specify').should('be.visible');
}


// Test Case 7: Verify Dependents record should be edited successfully
function verifyEditDependentRecord(uniqueName) {
  // cy.wait(2000);
  cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Updated');
  cy.contains(uniqueName).should('be.visible');
}

// Test Case 8: Verify Dependent Should be Deleted
function verifyDependentRecordDelete(uniqueName) {
  cy.wait(2000);
  cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Deleted');
  cy.contains(uniqueName).should('not.exist');

}

// Test Case 9: Verify PDF Attachments should be added 
function verifyDependentPDFUploaded(fileName) {
    cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Saved');
    cy.contains(fileName).should('be.visible');
  }

 // Test Case 10: Verify Comment Length Error Is Visible
function verifyCommentLengthError() {
  cy.wait(1000);
  cy.get('span.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').contains('Should not exceed 200 characters')

}

