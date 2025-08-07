var current_page = 1; // Current page for use with next and back buttons
var plus_pro;         // Dropdown 1 on page 1
var brand_approved;   // Dropdown 2 on page 1
var website_attached; // Dropdown 3 on page 1

var brand_name;       // String Entry 1 on page 2
var opt_in;           // String Entry 2 on page 2 set to all caps
var opt_out;          // String Entry 3 on page 2 set to all caps
var help_keyword;     // String Entry 4 on page 2 set to all caps
var message_boxes = [false, false, false]; // 3 checkboxes on page 2
var messages      = ["", "", ""];
var policy_copy;    // last checkbox on page 2

var opt_method;       // Dropdown on page 3

var privacy_link;     // String Entry 1 on page 4  Should probably conform to link naming standards but not for now
var tos_link;         // String Entry 2 on page 4
var contact_link;     // String Entry 3 on page 4
const name_placeholder = "Cody";

// Variables from the previous forms should be populated in form 4 sections after the links are written in

// TODO: VERY IMPORTANT: This is only a prototype not meant for public use until input sanitization and security is implemented 
//       Make it so when ${messages} gets displayed it doesn't show the empty strings
//       Display of message types on step 2 is showing up differently, should be bolded
//       Add checking to make sure none of the opt_in, opt_out, help_keyword are the same
//       Decide on whether to access elements by defining function level constants or not
//       Refactor it so that data is actually reused for the review instead of making a copy, especially for the checkboxes

// STEP 1 FUNCTIONS

function setPlus_ProVal() {
    plus_pro = document.getElementById('hasPlus').value;
}

function setBrandApprovedVal() {
    brand_approved = document.getElementById('brandApproved').value;
}

function setWebsiteAttachedVal() {
    website_attached = document.getElementById('hasWebsite').value;
}

function validateStep1() {
    console.log("Entered Validate Step 1 function");

    setPlus_ProVal();
    setBrandApprovedVal();
    setWebsiteAttachedVal();

    document.getElementById('plusResponse').classList.toggle('hidden', plus_pro !== 'no');
    document.getElementById('brandExplain').classList.toggle('hidden', brand_approved !== 'no');
    document.getElementById('noWebsiteSupport').classList.toggle('hidden', website_attached !== 'no');

    if( plus_pro         === 'yes' &&
        brand_approved   === 'yes' &&
        website_attached === 'yes') 
    {
        document.getElementById('errorMsg').classList.add('hidden');
        document.getElementById('step1NextBtn').disabled = false;
    }
    else {
        document.getElementById('errorMsg').classList.remove('hidden');
        document.getElementById('step1NextBtn').disabled = true;
    }
}

// STEP 2 FUNCTIONS

function toggleMessageTypeHelp() {
      const content = document.getElementById('messageInfo');
      const arrow   = document.getElementById('messageTypeArrow');

      if (content.style.display === 'block') {
        content.style.display = 'none';
        arrow.classList.remove('open');
      } 

      else {
        content.style.display = 'block';
        arrow.classList.add('open');
      }
}

function toggleNoWebsiteHelp() {
    const content = document.getElementById('noWebsiteInstructions');
    const arrow   = document.getElementById('noWebsiteArrow');

    if (content.style.display === 'block') {
      content.style.display = 'none';
      arrow.classList.remove('open');
    } 

    else {
      content.style.display = 'block';
      arrow.classList.add('open');
      document.getElementById("docTitleOutput").textContent = `${brand_name}'s Privacy Policy and Messaging Terms and services`;
    }
}

function setBrandName() {
    brand_name = document.getElementById("brandName").value.trim();
    console.log(`brand_name: ${brand_name}`)
}

function setOptIn() {
    opt_in= document.getElementById("optIn").value.trim();
    console.log(`opt_in: ${opt_in}`)
}

function setOptOut() {
    opt_out = document.getElementById("optOut").value.trim();
    console.log(`opt_out: ${opt_out}`)
}

function setHelpKeyword() {
    help_keyword = document.getElementById("helpKeyword").value.trim();
    console.log(`help_keyword: ${help_keyword}`)
}

function setPolicyCopy() {
    policy_copy = document.getElementById("policyCopy").checked;
    console.log(`policy_copy: ${policy_copy}`)
}

function generatePrivacyPolicy() {
          const policy = `Privacy Policy for ${brand_name}:
                         "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; 
                         this information will not be shared with any third parties. Message frequency varies. Message and data rates may apply."

                         Terms of Service for ${brand_name}:
                         "You agree to receive ${messages} messages from ${brand_name}. Message frequency varies. Message and data rates may apply. For help, reply ${help_keyword}. You can opt out at any time by replying ${opt_out}."`;

      document.getElementById("policyOutput").innerText = policy;
}

function setMessageBoxes() {
    const checkboxes = document.querySelectorAll('#messageTypeOptions input[type="checkbox"]');
    const messageStr = document.getElementById('messageType');

    message_boxes[0] = false;
    message_boxes[1] = false;
    message_boxes[2] = false;
	
	messages[0] = "";
    messages[1] = "";
    messages[2] = "";

    messageStr.value = "";

    document.getElementById('messageType').classList.add('hidden');
    
    checkboxes.forEach(cb => {
      if (cb.checked) {
          console.log(`checkbox value: ${cb.value}`);
          if (cb.value === 'Marketing') {
              message_boxes[0] = true; 
			  messages[0]      = "Marketing";
          }

          if (cb.value === 'AcctNotif') {
              message_boxes[1] = true;
			  messages[1]      = "Account Notifications";
          }

          if (cb.value === "ConverseCare") {
              message_boxes[2] = true;
			  messages[2]      = "Conversational / Customer Care";
          }
      }
    });
    if (message_boxes[0] || message_boxes[1] || message_boxes[2]) {
        messageStr.classList.remove('hidden');
    }
    for (message of messages) {
        if (message !== "") {
            messageStr.value += `${message}, `;
        }
    }

    console.log(`Marketing: ${message_boxes[0]}, AcctNotif: ${message_boxes[1]}, ConverseCare: ${message_boxes[2]}`)
}

function validateStep2() {
    setBrandName();
    setOptIn();
    setOptOut();
    setHelpKeyword();
    setPolicyCopy();
    setMessageBoxes();
    generatePrivacyPolicy();

    var validity_check = true;

    if( brand_name   === "" ||
        opt_in       === "" ||
        opt_out      === "" ||
        help_keyword === "")
    {
        validity_check = false;
    }
    
    if( !message_boxes[0] && 
        !message_boxes[1] && 
        !message_boxes[2])
    {
        validity_check = false;
    }

    if(!policy_copy) {
        validity_check = false;
    }

    if(validity_check) {
        document.getElementById('step2NextBtn').disabled = false; 
        document.getElementById('step2ErrorMsg').classList.add('hidden'); 
    }

    else {
        document.getElementById('step2NextBtn').disabled = true; 
        document.getElementById('step2ErrorMsg').classList.remove('hidden'); 
    }
}

// STEP 3 FUNCTIONS

function populateDetails() {
	// Const defined text blocks to insert into Step 3 Details
     const opt_details_website = `<strong>Website/Online opt-in:</strong><br>
     							  If your website has a "CONTACT US" form or any form that collects a phone number, the following information would be required.
     							  <br>This would apply also to store check out pages. Just include the information below at the bottom of the form.
     							  <br><br>This would be the method of opt in you would want to proceed with and the following information would be required to be located at the bottom of the form(s):<br><br> 
     							  <strong>The field for the phone number on the contact form must be optional and not required.</strong>
     							  <em>
     							  <br>
     							  "[] By checking this box I consent to receive SMS text message to my cell number provided above for ${messages} messages from ${brand_name} at the number provided. 
     							  I understand that I can opt-out of receiving text messages at any time by responding with ${opt_out}. I can reply with ${help_keyword} for help. Message frequency may vary. I understand that message and data rates may apply.
     							  See ${brand_name} Terms of Service and Privacy Policy.</em>
     							  <br><br>
     							  When clicking on Terms of services and Privacy Policy links, the user should be redirected to the links appropriately.`
     
     const opt_details_keyword = `<strong>Keyword Opt-in:</strong><br>
                                  <br>
                                  If you are using a keyword to opt-in your customers, the following information would be required to be located on your website. 
                                  Recommended on a Contact us Page that does NOT collect a phone number but just provides information on how customers can contact you:<br><br>
                                  <em>
                                  "By texting START to ${brand_name}, you consent to receive ${messages} messages from ${brand_name}. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies.
                                  Unsubscribe at any time by replying ${opt_out}. Reply ${help_keyword} for help. Please view our Privacy Policy & Terms on our website."
                                  </em>`
     
    const opt_details_consumer = `<strong>Consumer-Initiated Messaging:</strong><br><br>
                                  If you are using consumer-initiated messaging, the following information would be required to be located on your website. 
                                  Recommended on a Contact us Page that does NOT collect a phone number but just provides information on how customers can contact you:<br><br>
                                  <em>
                                  "By starting a text conversation with ${brand_name}, you are agreeing to receive conversational messages from ${brand_name}. Msg & data rates may apply. Msg frequency varies.
                                  Unsubscribe at any time by replying STOP. Reply ${help_keyword} for help. Privacy Policy [Privacy Policy Link] & Terms [Terms Link]."
                                  </em>`
    		  
    const opt_details_verbal   = `<strong>Verbal opt-in:</strong><br>
    						     This states that you will be collecting opt-in verbally from customers. 
    						     The customers will be able to opt in to receive messages either in person at their physical location, or over a phone call if the customer calls. 
    						     When a customer is registered for the first time, they are asked to provide the phone number, and staff is trained to ask if the customer would like to opt in to SMS-based billing notifications.
                                 They will be verbally informed that 'Message and data rates may apply', 'Message frequency may vary', and they can 'text ${help_keyword} for support or more information and STOP to unsubscribe at any time.'
                                 They will also be informed that their phone number will not be shared with third parties for marketing or promotional purposes.<br><br>
    						     <strong>Verbal opt-in can not be used for marketing messages.</strong><br>`
    
    
    
    const opt_details_document = `<strong>Document opt-in:</strong><br>
                                  <br>
                                  This is for when you have a physical document that people sign to opt in to SMS service.<br><br>
                                  The following information would be required on said document:<br><br>
                                  <em>
                                  "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent;
                                  this information will not be shared with any third parties. Message frequency varies. Message and data rates may apply."<br><br>
                                  "You agree to receive ${messages} messages from ${brand_name}. Message frequency varies. Message and data rates may apply. For help, reply ${help_keyword}. You can opt out at any time by replying ${opt_out}."<br><br>
                                  [ ] By checking this box I consent to receive SMS text messages to my cell number provided above for ${messages} messages from ${brand_name} at the number provided. 
                                  I understand that I can opt-out of receiving text messages at any time by responding with ${opt_out}. I can reply with ${help_keyword} for help. Message frequency may vary. I understand that message and data rates may apply.
                                  See ${brand_name} Terms of Service and Privacy Policy.
                                  </em>
                                  <br>
                                  <strong>Make sure to include a field for the phone number on the document that is optional.</strong>
                                  <br>
                                  <strong>Note: We will require a copy of said document for verification. Phone number must be optional.</strong>`

    opt_method = document.getElementById('optInMethod').value;
    switch (opt_method) {
        case 'website':
            document.getElementById('optInDetails').innerHTML = opt_details_website;
            break;
        case 'keyword':
            document.getElementById('optInDetails').innerHTML = opt_details_keyword;
            break;
        case 'consumer':
            document.getElementById('optInDetails').innerHTML = opt_details_consumer;
            break;
        case 'verbal':
            document.getElementById('optInDetails').innerHTML = opt_details_verbal;
            break;
        case 'document':
            document.getElementById('optInDetails').innerHTML = opt_details_document;
            break;
        default:
            console.log("Hit default in populating details on step3");
            break;
    }
}

function validateStep3() {
    console.log("Entering Validate Step3");
    populateDetails();
    
    if (document.getElementById('optInMethod').value === "") {
        document.getElementById('step3NextBtn').disabled = true;
        document.getElementById('optInDetails').classList.add('hidden');
    }
    else {
        document.getElementById('step3NextBtn').disabled = false;
        document.getElementById('optInDetails').classList.remove('hidden');
    }
}


// STEP 4 Functions

function step4MessageTypes() {
    const checkboxes = document.querySelectorAll('#reviewMessageTypeOptions input[type="checkbox"]');
    message_boxes[0] = false;
    message_boxes[1] = false;
    message_boxes[2] = false;
	
	messages[0] = "";
    messages[1] = "";
    messages[2] = "";
    
    checkboxes.forEach(cb => {
      if (cb.checked) {
          console.log(`checkbox value: ${cb.value}`);
          if (cb.value === 'Marketing') {
              message_boxes[0] = true; 
			  messages[0]      = "Marketing";
          }

          if (cb.value === 'AcctNotif') {
              message_boxes[1] = true;
			  messages[1]      = "Account Notifications";
          }

          if (cb.value === "ConverseCare") {
              message_boxes[2] = true;
			  messages[2]      = "Conversational / Customer Care";
          }
      }
    });

    setSampleMessages();
    console.log(`Marketing: ${message_boxes[0]}, AcctNotif: ${message_boxes[1]}, ConverseCare: ${message_boxes[2]}`)
}

function validateStep4() {
    // Check the Link input boxes, move on to displaying the review if they are not empty
    privacy_link = document.getElementById('privacyLink').value;
    tos_link     = document.getElementById('termsLink').value;
    contact_link = document.getElementById('contactLink').value;

    if( privacy_link !== "" &&
        tos_link     !== "" &&
        contact_link !== "") 
    {
        displayReview(); 
        document.getElementById('step4SubmitBtn').disabled = false;
    }
    else {
        hideReview();
        document.getElementById('step4SubmitBtn').disabled = true;
    }
}

function displayReview() {
    // Show the review sections prefilled with information from previous steps
    //
    // first: set reviewNameBox brand_name, reviewDescBox based on messages, and reviewMsgTypesBox based as messages
    // second: reviewOptInBox, reviewOptOutBox, reviewHelpBox based on the step 2 data, each immediately followed by an associated MsgBox
    // third: set the reviewOptInMethod.value based on opt_method, and the reviewOptInMsgBox based on opt_method
    // fourth: set reviewMethodTypeOptions checkboxes based on message_boxes and reviewSampleMsgBox based on message_boxes

    const opt_website = `Customers will fill out the form of: "${contact_link}"
                         From there customers will have the option of selcting :By checking this box I consent to receive an SMS text message to my cell number provided above for ${messages} from ${brand_name}.
                         I understand that I can opt-out of receiving text messages at any time by responding with "${opt_out}". I can reply with "${help_keyword}" to get help. Message frequency may vary.
                         I understand that message and data rates may apply. See ${brand_name}'s Terms of Service and Privacy Policy.

                         Privacy Policy Link: ${privacy_link}
                         Terms of Service Link: ${tos_link}`;

    const opt_keyword = `Customer's Are able to opt in to SMS to ${brand_name} by texting ${opt_in} at our number which can be found here ${contact_link}.
                         On that page The following verbiage is provided: "By starting a texting ${opt_in} with ${brand_name}, you are agreeing to ${messages} from ${brand_name}. 
                         Msg & data rates may apply. Msg frequency varies. Unsubscribe at any time by replying ${opt_out}. Reply ${help_keyword} for help. Privacy Policy link & Terms link

                         Privacy Policy Link: ${privacy_link}
                         Terms of Service Link: ${tos_link}`;
    
    const opt_consumer = `Customer's Are able to opt in to SMS to ${brand_name} by texting us at our number which can be Found here ${contact_link}. 
                          On that page The following verbiage is provided: "By starting a text conversation with ${brand_name}, you are agreeing to ${messages} from ${brand_name}. 
                          Msg & data rates may apply. Msg frequency varies. Unsubscribe at any time by replying ${opt_out} . Reply ${help_keyword} for help. Privacy Policy [link] & Terms [link]

                         Privacy Policy Link: ${privacy_link}
                         Terms of Service Link: ${tos_link}`;

    const opt_verbal = `*${brand_name}* will be collecting opt-in verbally from their customers. The customers will be able to opt in to receive messages either in person at their physical location, or over a phone call if the customer calls.
                        When a customer is registered for the first time, they are asked to provide the phone number, and staff is trained to ask If the customer would like to opt in to SMS-based billing notifications.
                        They will be verbally informed that "Message and data rates may apply", "Message frequency may vary", and they can "text [${help_keyword}] for support or more information and [${opt_out}] to unsubscribe at any time."
                        They will also be informed that their phone number will not be shared with third parties for marketing or promotional purposes.

                        Privacy Policy Link: ${privacy_link}
                        Terms of Service Link: ${tos_link}`;

   const opt_document = `Customers will be provided ( PLEASE PROVIDE DOCUMENTATION LINK), In which they will provided the following information and are able to opt in by the checking the following verbaige:
                         "[]By checking this box I consent to receive an SMS text message to my cell number provided above for ${messages} from ${brand_name}.
                         I understand that I can opt-out of receiving text messages at any time by responding with "${opt_out}". I can reply with "${help_keyword}" to get help. Message frequency may vary.
                         I understand that message and data rates may apply. See ${brand_name}'s Terms of Service and Privacy Policy.

                         Privacy Policy Link: ${privacy_link}
                         Terms of Service Link: ${tos_link}`;

    //FIRST
    document.getElementById('reviewNameBox').innerText     = brand_name;
    document.getElementById('reviewMsgTypesBox').innerText = messages;
    document.getElementById('reviewDescBox').innerText     = `${brand_name} will be contacting Opt-ed In clients in regards to ${messages}.`;;

    //SECOND
    document.getElementById('reviewOptInBox').innerText  = opt_in;
    document.getElementById('reviewOptOutBox').innerText = opt_out;
    document.getElementById('reviewHelpBox').innerText   = help_keyword;

    document.getElementById('reviewOptInMsgBox').innerText
      = `By texting ${opt_in}, you consent to receive ${messages} messages from ${brand_name}. Msg & data rates may apply. Msg frequency varies. 
         Unsubscribe at any time by replying ${opt_out}. For more information, reply ${help_keyword}. Privacy Policy: ${privacy_link}`;

    document.getElementById('reviewOptOutMsgBox').innerText
      = `You have successfully opted out of SMS messages from ${brand_name}, and no further messages will be sent.
         You can, however, send ${opt_in} to this number if you want to re-subscribe or reply ${help_keyword} for more information.`;

    document.getElementById('reviewHelpMsgBox').innerText
      = `Thanks for contacting ${brand_name}. We'll be in touch with you soon to help! Text ${opt_out} to stop receiving messages from ${brand_name}.
         You can also text ${opt_in} to restart getting messages.`;

    //THIRD
    var opt_in_msg = "";

    switch (opt_method) {
        case 'website':
            opt_in_msg = opt_website;
            break;
        case 'keyword':
            opt_in_msg = opt_keyword;
            break;
        case 'consumer':
            opt_in_msg = opt_consumer;
            break;
        case 'verbal':
            opt_in_msg = opt_verbal;
            break;
        case 'document':
            opt_in_msg = opt_document;
            break;
        default:
            console.log('hit default in review opt methods');
            break;
    }

    document.getElementById('reviewOptInMethod').value     = opt_method;
    document.getElementById('reviewOptInMsgBox').innerText = opt_in_msg;

    //FOURTH
    document.getElementById('reviewCheckboxMarketing').checked = message_boxes[0];
    document.getElementById('reviewCheckboxAcct').checked = message_boxes[1];
    document.getElementById('reviewCheckboxConv').checked = message_boxes[2];
    setSampleMessages();


    // Now show the Review
    document.getElementById('reviewSummarySection').style.display = "block";
}


function hideReview() {
    document.getElementById('reviewSummarySection').style.display = "none";
}

function setSampleMessages() {
    var sample_message = [];

    if (message_boxes[0]) {
        sample_message.push(`Marketing:\nHello this is ${name_placeholder} from ${brand_name}, We are offering 20% off your next order for the next 30 days!\n To unsubscribe from text messages, reply with ${opt_out}.\n`);
    }
    if (message_boxes[1]) {
        sample_message.push(`Account Notifications:\nHello this is ${name_placeholder} from ${brand_name},\nJust a reminder that you have a billing update on your account. 
                     Please visit our website in order to view the information.\nYou are able to reply ${opt_out} anytime to unsubscribe.\n`);
    }
    if (message_boxes[2]) {
        sample_message.push(`Conversational / Customer Care:\nHello this is ${name_placeholder} from ${brand_name},\nIt was nice speaking with you today. 
                     If you have further questions feel free to reach out via SMS or give this number a call.\nYou are able to reply ${opt_out} anytime to unsubscribe.\n`);
    }
    sample_message.join('\n\n');
    document.getElementById('reviewSampleMsgBox').innerText = sample_message;
}


function submitCampaign() {
    alert("Your SMS campaign Is almost complete please continue on the SMS registration form to complete the process!"); 
}

// STEP SWAPPING FUNCTIONS
function showStep1() {
    document.getElementById("step2").classList.add("hidden");
    document.getElementById("step3").classList.add("hidden");
    document.getElementById("step4").classList.add("hidden");

    document.getElementById("step1").classList.remove("hidden");
}
function showStep2() {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step3").classList.add("hidden");
    document.getElementById("step4").classList.add("hidden");

    document.getElementById("step2").classList.remove("hidden");
}

function showStep3() {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.add("hidden");
    document.getElementById("step4").classList.add("hidden");

    document.getElementById("step3").classList.remove("hidden");
}

function showStep4() {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.add("hidden");
    document.getElementById("step3").classList.add("hidden");

    document.getElementById("step4").classList.remove("hidden");
}

function previousStep() {
    switch (current_page) {
        case 2:
            showStep1();
            current_page--;
            break;
        case 3:
            showStep2();
            current_page--;
            break;
        case 4:
            showStep3();
            current_page--;
            break;
        default:
            console.log("Hit the default on previous page");
            break;
   }
}

function nextStep() {
    switch (current_page) {
        case 1:
            showStep2();
            current_page++;
            break;
        case 2:
            showStep3();
            current_page++;
            break;
        case 3:
            showStep4();
            current_page++;
            break;
        default:
            console.log("Hit the default on next page");
            break;
   }
}
