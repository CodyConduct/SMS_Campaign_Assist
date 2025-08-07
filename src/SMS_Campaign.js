var current_page = 1; // Current page for use with next and back buttons
var plus_pro;         // Dropdown 1 on page 1
var brand_approved;   // Dropdown 2 on page 1
var website_attached; // Dropdown 3 on page 1

var brand_name;       // String Entry 1 on page 2
var opt_in;           // String Entry 2 on page 2 set to all caps
var opt_out;          // String Entry 3 on page 2 set to all caps
var help_keyword;     // String Entry 4 on page 2 set to all caps
var message_boxes = [false, false, false]; // 3 checkboxes on page 2
var policy_copy;    // last checkbox on page 2

//var opt_method;       // Dropdown on page 3

//var privacy_link;     // String Entry 1 on page 4  Should probably conform to link naming standards but not for now
//var tos_link;         // String Entry 2 on page 4
//var contact_link;     // String Entry 3 on page 4

// Variables from the previous forms should be populated in form 4 sections after the links are written in

//document.addEventListener("change", validateStep1);

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

function setMessageBoxes() {
    const checkboxes = document.querySelectorAll('#messageTypeOptions input[type="checkbox"]');
    message_boxes[0] = false;
    message_boxes[1] = false;
    message_boxes[2] = false;
    
    checkboxes.forEach(cb => {
      if (cb.checked) {
          console.log(`checkbox value: ${cb.value}`);
          if (cb.value === 'Marketing') {
              message_boxes[0] = true; 
          }

          if (cb.value === 'AcctNotif') {
              message_boxes[1] = true;;
          }

          if (cb.value === "ConverseCare") {
              message_boxes[2] = true;
          }
      }
    });
    console.log(`Marketing: ${message_boxes[0]}, AcctNotif: ${message_boxes[1]}, ConverseCare: ${message_boxes[2]}`)
}

function validateStep2() {
    setBrandName();
    setOptIn();
    setOptOut();
    setHelpKeyword();
    setPolicyCopy();
    setMessageBoxes();

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



// STEP SWAPPING FUNCTIONS
function showStep1() {
    document.getElementById("step2").classList.add("hidden");
//    document.getElementById("step3").classList.add("hidden");
//    document.getElementById("step4").classList.add("hidden");

    document.getElementById("step1").classList.remove("hidden");
}

function showStep2() {
    document.getElementById("step1").classList.add("hidden");
//    document.getElementById("step3").classList.add("hidden");
//    document.getElementById("step4").classList.add("hidden");

    document.getElementById("step2").classList.remove("hidden");
}

function showStep3() {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.add("hidden");
//    document.getElementById("step4").classList.add("hidden");

//    document.getElementById("step3").classList.remove("hidden");
}

function showStep4() {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.add("hidden");
//    document.getElementById("step3").classList.add("hidden");

//    document.getElementById("step4").classList.remove("hidden");
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
