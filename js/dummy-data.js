var dummyDataPlanOptions = [{ text:"Option 1", value: "Option1" }, { text:"Option 2", value: "Option2" }, { text:"Option 3", value: "Option3" },{ text:"Option 4", value: "Option4" }]
var dummyDataYesNo = [{ text:"Yes", value: "Yes" }, { text:"No", value: "No" }]
var dummyDataPayment = [{ text:"Credit Card", value: "CreditCard" }, { text:"Online Banking", value: "OnlineBanking" }]
var dummyDataDoctors = [{ text:"Doctor 1", value: "Doctor1" }, { text:"Doctor 2", value: "Doctor2" }, { text:"Doctor 3", value: "Doctor3" }]

  var dummyData = {
  page1:
    {
      type: "page",
      name: "page 1",
      step: 1,
      childElements: [
        {
          type: "group",
          columns: '1',
          childElements: [
             { id: "Header", text: "Lets Get Started", subheader:"Enter the following details", type: "Header",  complete: false, required: true }, 
          ]
        },
        {
            type: "group",
            columns: '2',
            key: generateUUID(),
            childElements: [
               { id: "FirstName", text: "First Name", type: "TextField",  complete: false, key: generateUUID(), required: true },
               { id: "FamilyName", text: "Family Name", type: "TextField",  complete: false, key: generateUUID(), required: true },
            ]
          }, 
        {
          type: "group",
          columns: '3',
          key: generateUUID(),
          childElements: [
             { id: "DateOfBirth", text: "Date of Birth", type: "DateField",  required: true }, 
             { id: "Income",      text: "Income",        type: "NumberField",  required: true },
             { id: "Occupation",  text: "Occupation",    type: "SelectField",  required: true, options: dummyDataYesNo }
          ]
        },
        // {
        //   type: "group",
        //   columns: '1',
        //   key: generateUUID(),
        //   childElements: [
        //      { id: "NZCitizen1", text: "Are you a NZ citizen or resident?", type: "RadioOptionField",  complete: false, key: generateUUID(), required: true, options: dummyDataYesNo },
        //   ]
        // },
        // {
        //   type: "group",
        //   columns: '1',
        //   key: generateUUID(),
        //   childElements: [
        //      { id: "PlanOption", text: "Select a Premium",  type: "HeroOptionField", options: dummyDataPlanOptions },
        //   ]
        // },
        // {
        //   type: "group",
        //   columns: '1',
        //   key: generateUUID(),
        //   childElements: [
        //      { id: "PaymentTypeXYZ", text: "Payment Type", type: "AltValuesField", complete: false, required: true, options: dummyDataPayment }
        //   ]
        // },
      ]
    },

    page2:
      {
        type: "page",
        name: "page 2",
        step: 4,
        key: generateUUID(),
        childElements: [
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "Header", text: "Basic Details", subheader:"Enter the following details", type: "Header",  complete: false, key: generateUUID(), required: true }, 
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "FullName", text: "Full Name", type: "TextField",  complete: false, key: generateUUID(), required: true }, 
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "Address", text: "Address", type: "TextField", complete: false, key: generateUUID(), required: true }
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "NZCitizen", text: "Are you a NZ citizen or resident?", type: "RadioOptionField",  complete: false, key: generateUUID(), required: true, options: dummyDataYesNo },
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "Illness", text: "Confirm you have no terminal illnesses", type: "RadioOptionField",  complete: false, key: generateUUID(), required: true, options: dummyDataYesNo }, 
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "RestrictedActivity", text: "Confirm no participation in Restricted Recrational Actitivies", type: "RadioOptionField", complete: false, key: generateUUID(), required: true, options: dummyDataYesNo }
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "PaymentType", text: "Payment Type", type: "AltValuesField", complete: false, key: generateUUID(), required: true, options: dummyDataPayment }
            ]
          },

        ]
      },

    page3:
      {
        type: "page",
        name: "page 3",
        step: 4,
        key: generateUUID(),
        childElements: [
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "Header", text: "Success! Offer Confirmed", subheader:"Your application has been accepted for XXX amount", type: "Header",  complete: false, key: generateUUID(), required: true }, 
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "ConfirmOffer", text: "Upload Photo ID (Passport or Drivers Licence)", type: "UploadField",  complete: false, key: generateUUID(), required: true, options: dummyDataYesNo },
            ]
          },         
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "ConfirmOffer", text: "Confirm this offer?", type: "RadioOptionField",  complete: false, key: generateUUID(), required: true, options: dummyDataYesNo },
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "UseLockbox", text: "Do you wish to use our LockBox service?", type: "RadioOptionField",  complete: false, key: generateUUID(), required: true, options: dummyDataYesNo },
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "SelectDoctor", text: "Doctor Name (autoselect)", type: "TextField",  complete: false, key: generateUUID(), required: true, placeholder:'This will be a doctor autoselect field', options: dummyDataDoctors }, 
            ]
          }
        ]
      },

    page4:
      {
        type: "page",
        name: "page 4",
        step: 4,
        key: generateUUID(),
        childElements: [
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "Something Else", text: "Congratulations.", subheader:"Your have successfully signed up", type: "Header",  complete: false, key: generateUUID(), required: true, value: "ACCEPTED" }, 
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "Something Else", text: "Please download our app on your smartphone...", type: "BasicText",  complete: false, key: generateUUID(), required: true, value: "ACCEPTED" }, 
            ]
          },
          {
            type: "group",
            columns: '1',
            key: generateUUID(),
            childElements: [
               { id: "Something Else", text: "Terms, conditions, more details, etc.", type: "BasicText",  complete: false, key: generateUUID(), required: true, value: "ACCEPTED" }, 
            ]
          }
        ]
      }
  }
