import { assets } from "../assets/assets"
import Title from "../components/Title"


const About = () => {
  return (
    <div>
     <div className='text-center text-2xl pt-10 text-gray-500'>
      <Title text1={'About'} text2={'US'}/>
     </div>

     <div className='my-10 flex flex-col md:flex-row gap-12 items-center justify-center'>
      <img className='w-full md:max-w-[360px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>fashion fusion company clothes about us Fashion Fusion is a clothing company that blends style, quality, and affordability to create a unique shopping experience. They offer a wide range of fashion choices for men and women, from trendy streetwear to elegant formal wear1. </p>
        <p> Their in-house brands, such as Alora, Ciarra, Zaff, Nova, Moda, Nue, TRB, and Evolve, are known for their high-quality materials and expert craftsmanship.</p>
        <p>Fashion Fusion is committed to making high-end fashion accessible to everyone, ensuring that looking good doesn&apos;t come with a hefty price tag. They believe in inclusivity and body positivity, offering a variety of sizes to celebrate individuality</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>They aim to make fashion stylish, affordable, and accessible to everyone while promoting body positivity and inclusivity. Their commitment to sustainability reflects their desire to help the environment and ensure that fashion is both ethical and eco-friendly</p>
      </div>
     </div>

     <div className='text-xl my-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'}/>
     </div>

     <div className='flex flex-col md:flex-row mb-20'>
      <div className='border px-10 md:px-auto py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Affordable Luxury:</b>
        <p>Enjoy high-end fashion without breaking the bank. We offer stylish, premium products at accessible prices.</p>
      </div>
      <div className='border px-10 md:px-auto py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
      <b>Quality Craftsmanship:</b>
      <p>Each piece is crafted with precision, ensuring high standards of quality and durability.</p>
      </div>
      <div className='border px-10 md:px-auto py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
      <b>Customer-Centric Service:</b>
      <p>Our dedicated customer service team is always ready to assist, ensuring a seamless shopping experience from start to finish.</p>
      </div>

     </div>
    </div>
  )
}

export default About