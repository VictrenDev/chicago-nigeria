import Script from "next/script";

export default function Signup() {
    return (
        <>
            <iframe
                src="https://links.chicagonigerians.com/widget/form/fnCAT2RCQRSSkWKVpdxz"
                className="form-style"
                id="popup-fnCAT2RCQRSSkWKVpdxz"
                data-layout="{'id':'POPUP'}"
                data-trigger-type="alwaysShow"
                data-activation-type="alwaysActivated"
                data-deactivation-type="neverDeactivate"
                data-form-name="NACR Contact/Join Form"
                data-height="640"
                data-form-id="fnCAT2RCQRSSkWKVpdxz"
                title="NACR Contact/Join Form"
            />

            {/* Load the external form script once */}
            <Script src="https://links.chicagonigerians.com/js/form_embed.js" strategy="afterInteractive" />
        </>
    );
}
