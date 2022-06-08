import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = mailChannelsPlugin({
    personalizations: [
        {
            to: [{name: "ACME Support", email: "atpoolsla@gmail.com"}],
        },
    ],
    from: {
        name: "ACME Support",
        email: "atpoolsla@gmail.com",
    },
    // from: ({formData}) => {
    //     //     const sender = formData.get('email')
    //     //     return {
    //     //         name: "Form submit",
    //     //         email: `${sender}`,
    //     //     }
    //     // },
    respondWith: () => {
        return new Response(
            `Thank you for submitting your enquiry. A member of the team will be in touch shortly.`
        );
    },
});
