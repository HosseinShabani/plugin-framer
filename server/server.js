const Replicate = require("replicate");
require("dotenv").config();

// Oslo — Free Framer Creative Portfolio
const template_text = [
  "We specialize in crafting exceptional digital experiences to help our clients achieve their business goals.",
  "Product Design Experience",
  "Scroll to explore",
  "We strive to bring innovation and creativity to every project we undertake. Our team of experts works closely with our clients to understand their needs and deliver outstanding solutions. We are dedicated to creating products that exceed our clients' expectations.",
  "Example Project Header",
  "Click",
  "Work",
  "EXPLORE",
  "Framer template crafted with love by Dawid Pietrasiak",
  "We don't just create brands; we craft unforgettable experiences that leave a lasting impression.",
  "Studio",
  "We pride ourselves on partnering with founders to turn their ambitious visions into transformative brands. Since 2013, we have been creating designs that not only stand out but also deliver results.",
  "Our portfolio speaks for itself. With over 70 awards in design and digital innovation, we have a proven track record of delivering recognition and success for our partners. Our team of experts is dedicated to understanding your business needs and creating designs that align with your goals. Let us help you elevate your brand and stand out in your industry.",
  "Research & Brand Strategy",
  "Brand StrategyResearch & Insights• Content Marketing• User Experience Research",
  "Creative Direction & Design",
  "Web DesignUX & UI DesignBrand Identity• Interaction DesignVideo Production• Animation• Illustration",
  "We believe that it is possible to live in a world where every product or service is designed with an easy-to-use experience in mind",
  "Let's talk",
  "Connecting with our clients to create tailor-made solutions",
  "New York2210 18th Street,New York, NY 80024Rome4020 20th Street,3920 Rome",
  "LinkHere",
  "hello@framer.com",
  "Oops. It looks like the page you're trying to reach doesn't exist or has been moved.",
  "Suitcase App",
  "Travel Smart & Safely",
  "Ziggo is designed to provide travelers with peace of mind and enhanced security by offering a range of smart features that make managing luggage simpler and more efficient.",
  "Client",
  "TravelTech Innovations",
  "Services",
  "Visual DesignUI & UX Design",
  "Industries",
  "Travel",
  "Date",
  "January 2023",
  "Top Project Description",
  "Bottom Project Description",
  "Visual Design\nUI & UX Design",
  "The primary objective was to create an intuitive and reliable app that integrates seamlessly with smart suitcases, offering functionalities such as remote locking and unlocking, battery level monitoring, and real-time notifications if the suitcase moves beyond a certain distance from the user. The project aimed to enhance the travel experience by providing users with ultimate control and security over their luggage, reducing stress and improving convenience during journeys.\n\n The development of the Ziggo app has had a significant impact on the travel experience for users, offering enhanced security, convenience, and peace of mind. The ability to remotely control and monitor their luggage has reduced the stress associated with traveling, particularly in busy and unfamiliar environments. ",
  "Overall, the Ziggo app has successfully enhanced TravelTech Innovations' product offering, positioning the company as a leader in smart travel technology. The app has received excellent reviews from users, highlighting its reliability, ease of use, and the added security it provides. As a result, TravelTech Innovations has seen increased customer loyalty and a growing user base, solidifying its reputation in the market.",
  "Exchango Dashboard",
  "Real-Time Currency Tracking and Analysis",
  "GlobalFinance Inc. approached us to develop an intuitive and comprehensive currency exchange dashboard app. The primary objective was to offer a seamless user experience, providing real-time exchange rate information, historical trends, and predictive analytics.",
  "GlobalFinance Inc.",
  "The development of the currency exchange dashboard app significantly enhanced GlobalFinance Inc.'s service offerings. Users experienced a seamless and efficient way to manage their international finances. The real-time data, combined with powerful analytics and a user-friendly interface, empowered users to make well-informed financial decisions. ",
  "Feedback from users highlighted the app’s ease of use, reliability, and the valuable insights it provided, cementing GlobalFinance Inc.'s position as a leader in international financial services.",
  "Copay",
  "Simple Banking Rewarding System",
  "Unlock the future of seamless banking with Copay, where user experience meets unparalleled rewards. Our cutting-edge UX/UI digital project redefines the banking landscape, making every interaction effortless and every transaction rewarding.",
  "Copay Bank",
  "Banking",
  "The journey began with a vision: to create a banking platform that prioritized simplicity without compromising functionality. The UX/UI design team meticulously crafted an interface that seamlessly guided users through their financial activities. From account management to transaction histories, every feature was intuitively designed for effortless navigation.",
  "The results were staggering. Copay not only achieved its goal of simplifying banking but exceeded expectations in every aspect. User satisfaction soared as customers reveled in the seamless experience and lucrative rewards. The platform's user base grew exponentially, cementing Copay's position as a leader in the digital banking space.",
  "Paws & Plans App",
  "The Ultimate Veterinary Clinic Scheduler",
  'Say goodbye to missed appointments and scheduling headaches. With "Paws & Plans," PetCare Plus Veterinary Clinic is revolutionizing the way pet owners manage their furry friends\' healthcare. ',
  "PetCare Plus Clinic",
  "Healthcare",
  '"Paws & Plans" offers a comprehensive suite of features to streamline every aspect of your pet\'s healthcare journey. With an intuitive calendar system, scheduling veterinary appointments has never been easier. Additionally, the app provides medication reminders, ensuring your furry friend stays on track with their treatment plan. Accessing your pet\'s medical records is a breeze with "Paws & Plans," allowing for seamless communication with your veterinarian and ensuring continuity of care. ',
  "In summary, \"Paws & Plans\" is more than just a mobile app – it's a game-changer in pet care management. By simplifying scheduling, providing medication reminders, and granting access to medical records, the app empowers pet owners to take control of their pet's health with ease and confidence. ",
  "Vet Clinic App",
  "Copay System",
];

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

async function name() {
  try {
    // const model = "nateraw/nous-hermes-2-solar-10.7b:1e918ab6ffd5872c21fba21a511f344fd12ac0edff6302c9cd260395c7707ff4";

    // 2
    const model = "meta/meta-llama-3-8b-instruct";
    // input: {
    //   top_p: 0.95,
    //   prompt: prompt,
    //   temperature: 0.7,
    //   system_prompt: "You are a helpful assistant",
    //   system_prompt: "You are an expert analyst tasked with identifying the main idea of a website based on provided texts. Summarize the core theme concisely in 100 words.",
    //   length_penalty: 1,
    //   max_new_tokens: 512,
    //   stop_sequences: "<|end_of_text|>,<|eot_id|>",
    //   prompt_template:
    //     "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    //   presence_penalty: 0,
    // },

    // 3
    // const model =
    //   "nateraw/nous-hermes-llama2-awq:b3f3f0120a3c4fd37a5e75164cc3ed883c248b9e6d004a70f0d31c3b0debb604";
    // input: {
    //   top_k: 50,
    //   top_p: 0.95,
    //   prompt: "give me a 🔥 weeknight recipe for a Japanese curry",
    //   temperature: 0.8,
    //   max_new_tokens: 512,
    //   prompt_template: "Below is an instruction that describes a task. Write a response that appropriately completes the request.\n\n### Instruction:\n{prompt}\n\n### Response:\n",
    //   presence_penalty: 0,
    //   frequency_penalty: 0
    // }
    // const prompt_template =
    //   "Below is an instruction that describes a task. Write a response that appropriately completes the request.\n\n### Instruction:\nAnalyze the following texts extracted from a website and determine the main idea of the website. Provide a concise summary in approximately 100 words.\n\n### Texts:\n{prompt}\n\n### Response:\n";

    console.log("Running the model " + model);
    const prompt = `I find these texts from a website. what is the main idea of the website? just say the main idea, summarize and in 100 words.  \n\n ${text12}`;

    const output = await replicate.run(model, {
      input: {
        top_p: 0.95,
        prompt: prompt,
        temperature: 0.7,
        system_prompt:
          "You are an expert analyst tasked with identifying the main idea of a website based on provided texts. Summarize the core theme concisely in 100 words.",
        length_penalty: 1,
        max_new_tokens: 512,
        stop_sequences: "<|end_of_text|>,<|eot_id|>",
        prompt_template:
          "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
        presence_penalty: 0,
      },
    });
    console.log("finish the model...");

    console.log(output.join(" "));
    console.log("end the model...");
  } catch (error) {
    console.log(error);
  }
}
name();
