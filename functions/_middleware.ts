import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = mailchannelsPlugin({
    personalizations: [
        {
            to: [{ name: "ACME Support", email: "atpoolsla@gmail.com" }],
        },
    ],
    from: { name: "Enquiry", email: "no-reply@example.com" },
    respondWith: ({ formData }) => {
        // const replyMsg = `Hello, ${formData.get('email')}! Thank you, we will reply shortly`
        return new Response(null, {
            status: 302,
            headers: {Location: "/thank-you"},
        })
    }
});
