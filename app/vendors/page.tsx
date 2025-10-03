import Script from "next/script";

export default function Vendors() {
    return (
        <>
            <iframe
                src="https://links.chicagonigerians.com/widget/form/G5bDpvqKYmrXKUWPBNxz"
                className="form-style"
                id="inline-G5bDpvqKYmrXKUWPBNxz"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Nigeria @ 65 Registration - Vendor"
                data-height="1034"
                data-layout-iframe-id="inline-G5bDpvqKYmrXKUWPBNxz"
                data-form-id="G5bDpvqKYmrXKUWPBNxz"
                title="Nigeria @ 65 Registration - Vendor"></iframe>

            {/* Load the external form script once */}
            <Script src="https://links.chicagonigerians.com/js/form_embed.js" strategy="afterInteractive" />
        </>
    );
}
