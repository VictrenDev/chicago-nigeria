import Script from "next/script";

export default function GetStarted() {
  return (
    <>
      <iframe
        src="https://links.chicagonigerians.com/widget/form/L6TgvC0AbAiVXlYz4caX"
        className="form-style"
        id="inline-L6TgvC0AbAiVXlYz4caX"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-activation-type="alwaysActivated"
        data-deactivation-type="neverDeactivate"
        data-form-name="Nigeria @ 65 Registration - General"
        data-height="1111"
        data-form-id="L6TgvC0AbAiVXlYz4caX"
        title="Nigeria @ 65 Registration - General"
      /> 

      {/* Load the external form script once */}
      <Script src="https://links.chicagonigerians.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
