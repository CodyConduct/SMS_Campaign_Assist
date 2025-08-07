var plus_pro;        // Dropdown 1 on page 1
var brand_approved; // Dropdown 2 on page 1
var website_attached; // Dropdown 3 on page 1

//var brand_name;       // String Entry 1 on page 2
//var opt_in;           // String Entry 2 on page 2 set to all caps
//var opt_out;          // String Entry 3 on page 2 set to all caps
//var help_keyword;     // String Entry 4 on page 2 set to all caps
//var message_types;    // 3 checkboxes on page 2
//var copied_policy;    // last checkbox on page 2
//
//var opt_method;       // Dropdown on page 3
//
//var privacy_link;     // String Entry 1 on page 4  Should probably conform to link naming standards but not for now
//var tos_link;         // String Entry 2 on page 4
//var contact_link;     // String Entry 3 on page 4

// Variables from the previous forms should be populated in form 4 sections after the links are written in

//document.addEventListener("change", validateStep1);

console.log("JS Started");

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

    console.log("in the validate function");

    setPlus_ProVal();
    setBrandApprovedVal();
    setWebsiteAttachedVal();

    document.getElementById('plusResponse').classList.toggle('hidden', plus_pro !== 'no');
    document.getElementById('brandExplain').classList.toggle('hidden', brand_approved !== 'no');
    document.getElementById('noWebsiteSupport').classList.toggle('hidden', website_attached !== 'no');

    document.getElementById("infopane").innerHTML = `plus_pro: ${plus_pro}, brand_approved: ${brand_approved}, website_attached: ${website_attached}`;
}
