import MailchimpSubscribe from "react-mailchimp-subscribe";

const MailchimpFormContainer = () => {
  const MAILCHIMP_URL =
    "https://michaelduren.us21.list-manage.com/subscribe/post?u=e608f4f4452c5736881c1d4d3&amp;id=1e78d8bd1f&amp;f_id=0062a8e1f0";

  return (
    <div>
      <MailchimpSubscribe url={MAILCHIMP_URL}></MailchimpSubscribe>
    </div>
  );
};

export default MailchimpFormContainer;
