import { Types } from 'mongoose';
import Category from '../../../../models/category.model';
import Discount from '../../../../models/discount.model';
import Brand from '../../../../models/brand.model';
import algolia from '../../../../algolia';

interface Products {
  name: string;
  description: String;
  categoryId: Array<Types.ObjectId>;
  sku: String;
  specification: String;
  quantity: number;
  totalStock?: Number;
  price: Object;
  images: Array<String>;
  isDeleted?: Boolean;
  isInStock: Boolean;
  discountId: Types.ObjectId;
  tags?: Array<string>;
  brandId?: Types.ObjectId;
  brandName?: String;
  reviews?: Array<Types.ObjectId>;
  categoryNames?: Array<String>;
  slug: string;
}

const category = new Category({
  name: 'Phones',
  isDeleted: false,
  icon: 'cellphone-iphone',
});
const tvCategory = new Category({
  name: 'Television Set',
  isDeleted: false,
  icon: 'television',
});
const camCategory = new Category({
  name: 'Camera',
  isDeleted: false,
  icon: 'camera-outline',
});
const accCategory = new Category({
  name: 'Accessories',
  isDeleted: false,
  icon: 'power-plug',
});
const compCategory = new Category({
  name: 'Computer',
  isDeleted: false,
  icon: 'laptop',
});
const hkCategory = new Category({
  name: 'Home-Kitchen',
  isDeleted: false,
  icon: 'blender',
});
const gamCategry = new Category({
  name: 'Gaming',
  isDeleted: false,
  icon: 'gamepad',
});
const gadgetCategory = new Category({
  name: 'Phones-Gadgets',
  isDeleted: false,
  icon: 'cellphone-iphone',
});

const headCategory = new Category({
  name: 'Headphones',
  isDeleted: false,
  icon: 'headphones',
});

const hpBrand = new Brand({ name: 'HP' });
const appleBrand = new Brand({ name: 'Apple' });
const nikonBrand = new Brand({ name: 'Nikon' });
const sonyBrand = new Brand({ name: 'Sony' });
const samsungBrand = new Brand({ name: 'Samsung' });
const infinixBrand = new Brand({ name: 'Infinix' });
const hisenseBrand = new Brand({
  name: 'Hisense',
  logo:
    'https://res.cloudinary.com/codebars/image/upload/v1582102865/garahub/brands/Hisense-logo-2012-880x660_2x_aweook.png',
});

const discount = new Discount({
  name: 'coupon1',
  discount: '10',
  type: 'Coupon',
  valid: '2020-01-28T19:21:10.786+00:00',
});
const polyStarBrand = new Brand({
  name: 'Polystar',
  logo:
    'https://res.cloudinary.com/codebars/image/upload/v1582745191/garahub/brands/100_oswsg2.jpg',
});

const microsoftBrand = new Brand({
  name: 'Microsoft',
  logo:
    'https://res.cloudinary.com/codebars/image/upload/v1582746529/garahub/brands/microsoft_ecqo1f.jpg',
});

export async function createCategories() {
  const allCategories = [
    hpBrand,
    appleBrand,
    nikonBrand,
    sonyBrand,
    samsungBrand,
    infinixBrand,
    hisenseBrand,
    polyStarBrand,
    microsoftBrand,
  ];

  allCategories.forEach(category => {
    const index = algolia.initIndex('categories');

    index.setSettings({ searchableAttributes: ['name'] });

    index.saveObject(
      { name: category.name, objectID: category._id },
      { autoGenerateObjectIDIfNotExist: true },
    );
  });

  await Promise.all([
    category.save(),
    discount.save(),
    tvCategory.save(),
    camCategory.save(),
    accCategory.save(),
    compCategory.save(),
    hkCategory.save(),
    gadgetCategory.save(),
    gamCategry.save(),
    headCategory.save(),
  ]);

  await Promise.all([
    hpBrand.save(),
    appleBrand.save(),
    nikonBrand.save(),
    sonyBrand.save(),
    samsungBrand.save(),
    infinixBrand.save(),
    hisenseBrand.save(),
    polyStarBrand.save(),
    microsoftBrand.save(),
  ]);
}

const productsData: Array<Products> = [
  {
    name:
      'Apple IPhone XS Max (4GB RAM, 64GB ROM) IOS 12 (12MP + 12MP)+7MP 4G Smartphone - Silver',
    description:
      'Brand new apple iPhone X Max affordable, silver color with ios 12 operating system',
    categoryId: [compCategory._id],
    sku: 'sku12',
    specification:
      '6.5-inch Super Retina display (OLED) with HDR \n IP68 dust and water resistant (maximum depth of 2 meters up to 30 minutes) \n12MP dual cameras with dual OIS and 7MP TrueDepth front camera – Portrait mode, Portrait Lighting, Depth Control, and Smart HDR \nFace ID for secure authentication and Apple Pay \nA12 Bionic with next-generation Neural Engine \nWireless charging – works with Qi chargers \n iOS 12 with Memoji, Screen Time, Siri Shortcuts, and Group FaceTime',
    quantity: 73,
    price: { '1-50': '800000', '51-60': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Phones', 'Phones-Gadgets', 'Mobile Phones', 'iOS Phones'],
    slug:
      'Apple-IPhone-XS-Max-4GB-RAM-64GB-ROM-IOS-12-12MP-12MP-7MP-4G-Smartphone-Silver',
  },
  {
    name: 'Hp 255 AMD Quad Core (500GB HDD,4GB+ 32GB Flash Drive Freedos',
    description: 'Black HP Quad Core laptop',
    categoryId: [compCategory._id],
    sku: 'sku12',
    specification:
      'Model - HP 255 AMD QUAD CORE(4 Cores) 500GB HDD 4GB RAM 32GB FLASH Processor 1.5Ghz UP TO 2.16GHz Memory - 4GB Hard disk - 500GB Graphics Card - Intel HD Graphics Screen - 15.6 HD BV LED-backlight Display SuperMulti 8X DVD-RW Network - WiFi 802.11 bgn, Bluetooth Webcam + Mic, Battery - Li-Ion 4-cell Operating system - Freedos Other - Memory card reader, Wireless, DUAL AUDIO SPEAKERS Colors- Black Mass- 3kg Warranty - 1 year',
    quantity: 193,
    price: { '1-55': '800000', '55-100': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp1_d5660r.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp2_kbiwra.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp3_lbdzgr.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: hpBrand._id,
    brandName: 'HP',
    categoryNames: ['Computer', 'Laptops', 'HP Laptops'],
    slug: 'Hp-255-AMD-Quad-Core--500GB-HDD-4GB--32GB-Flash-Drive-Freedos',
  },
  {
    name: 'Nikon D7200 DSLR Camera With 18-140mm VR Lens - Black',
    description: 'Black Nikon camera',
    categoryId: [camCategory._id],
    sku: 'sku13',
    specification:
      "Poised to deliver in the most challenging of situations, Nikon's D7200 is a versatile DX-format DSLR that caters to both still photography and video users. Featuring a 24.2MP CMOS sensor which lacks an optical low-pass filter, and an EXPEED 4 image processor, the D7200 is able to record up to 6 fps at full-resolution, or 7 fps at a 1.3x crop, with a 100-frame buffer for extended high-speed shooting. This sensor and processor combination also avails a top native sensitivity of ISO 25600, which can further be expanded to black & white-dedicated ISO 51200 and ISO 102400 sensitivities. Full HD 1080p video recording is supported up to 60 fps, and in-camera time lapse shooting with automatic exposure smoothing is possible for up to 9,999 consecutive frames. In addition to the sheer imaging benefits, the D7200 also incorporates a large 3.2\" 1,229k-dot LCD monitor, dual SD card slots, and features built-in snapbridge Wi-Fi connectivity with NFC for simple linking of your mobile device. Capable of performing in both still and video realms, the D7200 is an all-around shooter that blends sophisticated imaging technologies with refined handling and design. Rounding out its feature-set, the D7200 is also characterized by an apt 51-point AF system, with 15 cross-type points, for quick and accurate focusing in a variety of conditions. The 3D Color Matrix Metering II system, which utilizes a 2,016-pixel RGB sensor, also benefits the focusing capabilities in addition to providing precise exposure metering capabilities. Further realizing a complete imaging solution, a series of Picture Control profiles can be applied to refine the color and tonal handling of imagery. Included with the D7200 body is the wide-angle to telephoto zoom AF-S DX NIKKOR 18-140mm f/3.5-5.6G ED VR lens, which features VR image stabilization to minimize camera shake to suit working in dimly-lit conditions and with longer focal lengths. One aspherical element and one extra-low dispersion element are integrated into the lens' design to minimize aberrations and optimize image sharpness and an SWM autofocus mechanism is used to acquire focus quickly, silently, and accurately.",
    quantity: 200,
    price: { '1-100': '3000000', '100-200': '2000000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon1_wjdqhw.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon2_mjowxc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon3_asa1g4.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: nikonBrand._id,
    brandName: 'Nikon',
    categoryNames: ['Camera', 'Photography', 'Nikon Cameras'],
    slug: 'Nikon-D7200-DSLR-Camera-With-18-140mm-VR-Lens-Black',
  },
  {
    name: '6 Layers Shoes Rack With A Fabric Cover',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [hkCategory._id],
    sku: 'sku14',
    specification:
      'very trendy and strong holds shoes and has a cover for dust.It beautifies your room to the modern standard and also helps to create space. It is a must have if you want the modernise way of arranging your room.',
    quantity: 15,
    price: { '1-5': '40000', '5-15': '35000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093931/garahub/products/shoerack_dkx8wg.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug: '6-Layers-Shoes-Rack-With-A-Fabric-Cover',
  },
  {
    name: 'Microsoft Xbox One X 1TB Console - Gears 5 Bundle',
    description:
      'Own the Xbox One X Gears 5 Bundle and experience an epic campaign and brutal action across five thrilling modes.',
    categoryId: [gamCategry._id],
    sku: 'sku14',
    specification:
      'Bundle includes: XB1 x 1TB limited edition console; Xbox wl controller kait diaz le; full game download of Gears 5 ultimate edition; full game downloads of gears of war: ue & gears of war 2, 3, &4; month trial of Xbox game pass;& month of Xbox live gold \n If purchased through Xbox All Access: Enjoy low monthly payments for 24 months, no upfront cost, access to over 100 high-quality games and online multiplayer. Plus console upgrade option.',
    quantity: 20,
    price: { '1-10': '1400000', '10-15': '1100000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582746367/garahub/products/xboxone_gncaes.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582746367/garahub/products/gears_dpx4pu.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: microsoftBrand._id,
    brandName: 'Microsoft',
    categoryNames: ['Gaming', 'Xbox'],
    slug: 'Microsoft-Xbox-One-X-1TB-Console-Gears-5-Bundle',
  },
  {
    name:
      'Samsung Galaxy Note 10 Plus (Note 10+) 6.8-Inch (12GB RAM, 256GB ROM), (12MP + 16MP) Dual SIM 4,300 MAh Smartphone - Aura Black"',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, category._id],
    sku: 'sku15',
    specification:
      "Few smartphones are quite as legendary and influential as the Galaxy Note line. Over the years since the Note N7000, back in 2011, Note handsets have pushed many envelopes. Putting productivity and consumer needs first is what helped the Galaxy Notes define the phablet category and bring new life to the stylus accessory. \nEight or so years later the Galaxy Note family has an incredible weight on its shoulders and more than a few uphill battles to fight at the same time. So they've approached these challenges by delivering two distinct Note10 this year - the Galaxy Note10 and its Note10+ sibling.",
    quantity: 11,
    price: { '1-3': '700000', '4-8': '650000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094147/garahub/products/samsung1_bg4wq1.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung2_qh5rqs.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung3_cjujrn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: samsungBrand._id,
    brandName: 'Samsung',
    categoryNames: [
      'Phones',
      'Phones-Gadgets',
      'Samsung Phones',
      'Android Phones',
    ],
    slug:
      'Samsung-Galaxy-Note-10-Plus-Note-10-6-8-Inch-12GB-RAM-256GB-ROM-12MP-16MP-Dual-SIM-4-300-MAh-Smartphone-Aura-Black-',
  },
  {
    name:
      'Professional Gaming Headset Stereo Led Headphones With Mic For PS4 Xbox One Phone - Black & Blue',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, headCategory._id],
    sku: 'sku15',
    specification:
      'Features: \nHigh precision 40mm driver, bring you vivid sound field, sound clarity, sound shock feeling, capable of various games. \nAmbient noise isolation. \n3.5mm connector, it is suitable for iPhone 6 / 6 Plus, Samsung S5, S4, LG, Xiaomi, iPad, PC, laptop, tablet, etc. \nEarmuffs used with skin-friendly leather material, and super soft Over-ear pads that is more comfortable for long time wear. \nGlaring LED lights are designed on the earcups, highlighting the atmosphere of the game. \nPVC wire, durable tensile effectively reduce the external resistance; cable tie, prevent the line twining.\nLine is equipped with a rotary volume controller, one key Mic mute, more convenient to use.\nExquisite craftsmanship and fashion appearance.\nProfessional gaming headset for your choice.\nSpecifications: \nModel: GM-1 \nColor: Black-red, Black-blue \nHeadphone size: Approx. 95*215*205mm/ 3 7*8.5*8.1in\nPackage content:\n1 * GM-1 Headphone',
    quantity: 20,
    price: { '1-10': '90000', '11-20': '85999' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset1_iut5gf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset2_pln1lf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset4_prtknh.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset3_ani5fn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    categoryNames: ['Headphones'],
    slug:
      'Professional-Gaming-Headset-Stereo-Led-Headphones-With-Mic-For-PS4-Xbox-One-Phone-Black-Blue',
  },
  {
    name: 'Apple Mac-book Pro 2017 16gb 256ssd Core I7 Quality Brand',
    description: 'Macbook Pro 2017 16gb 256ssd core i7',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      'SKU: AP044EL0U3Q08NAFAMZ\nDisplay Size (inches): 15.0\nRAM (GB): 256\nHard Disk (GB): 256\nMegapixels: 0.0\nOperating System: Mac OS X\nInternal Memory(GB): 16\nColor: N/A\nMain Material: N/A\nModel: N/A\nProduct Line: DaDiva\nWeight (kg): 2',
    quantity: 5,
    price: { '1-2': '1300000', '2-5': '1120000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac1_snusta.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac2_asx44i.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Laptops', 'Apple Laptops', 'Mac Books'],
    slug: 'Apple-Mac-book-Pro-2017-16gb-256ssd-Core-I7-Quality-Brand',
  },
  {
    name:
      'Infinix S5 Lite X652C-DUAL SIM-32GB ROM-3GB RAM-4G-16MP-TRIPLE AI CAMERA-4000 MAh-FINGERPRINT-VIOLET',
    description:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look.',
    categoryId: [gadgetCategory._id],
    sku: 'sku16',
    specification:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look. You probably might confuse the S5 lite for a smartphone from another brand. This goes to say Infinix went beyond the norm.\nThe beautiful design of the handset is a product of Infinix’s move to making their smartphones fit into the current trend of smartphones with classy design.',
    quantity: 23,
    price: { '1-10': '400000', '10-30': '250000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094913/garahub/products/infinix_xkd2h7.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Infinix',
    categoryNames: [
      'Phones',
      'Phones-Gadgets',
      'Infinix Phones',
      'Android Phones',
    ],
    slug:
      'Infinix-S5-Lite-X652C-DUAL-SIM-32GB-ROM-3GB-RAM-4G-16MP-TRIPLE-AI-CAMERA-4000-MAh-FINGERPRINT-VIOLET',
  },
  {
    name: 'Binatone Blender And Smoothie Maker BLS-360',
    description:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home.',
    categoryId: [hkCategory._id],
    sku: 'sku16',
    specification:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home. It is a safe and healthy way of blending and grinding food in the kitchen. It is better than the old and crude way of grinding pepper in our homes. Staying healthy requires that you eat balanced meals, to help you prepare these meals conveniently; you need the right appliances. This Binatone Blender/Smoothie will make food preparing absolute fun! ',
    quantity: 9,
    price: { '1-10': '100000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender1_fmttjn.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender3_msc74f.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender2_ff4mhc.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Binatone',
    categoryNames: ['Home-Kitchen', 'Home', 'kitchen'],
    slug: 'Binatone-Blender-And-Smoothie-Maker-BLS-360',
  },
  {
    name:
      'Apple 2017 IMac 27" With Retina 5K-Intel Core I5 (7th Gen) 3.4 GHz (Quad-Core)- 8GB RAM- 1TH FUSION- AMD Radeon Pro 570 Graphics Card (4GB)- Mac OS High Sierra',
    description:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core)',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core), 27" 5120 x 2880 IPS Retina 5K Display, AMD Radeon Pro 570 Graphics Card (4GB) of VRAM, 8GB of DDR4 RAM - 1TB Fusion Drive, UHS-II SDXC Card Reader, Thunderbolt 3, USB 3.0 Type-A, 802.11ac Wi-Fi, Bluetooth 4.2, 1 x Gigabit Ethernet Port, 2 x DisplayPort via Thunderbolt Port, User-Facing: 720p Video, Magic Keyboard & Magic Mouse 2 Included, Mac OS High Sierr',
    quantity: 20,
    price: { '1-10': '8000000', '11-20': '7280000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac1_nxhssc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac2_waxxnp.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac3_ed6onr.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac4_h14mkq.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Desktops', 'Apple Desktops', 'iMac'],
    slug:
      'Apple-2017-IMac-27-With-Retina-5K-Intel-Core-I5-7th-Gen-3-4-GHz-Quad-Core-8GB-RAM-1TH-FUSION-AMD-Radeon-Pro-570-Graphics-Card-4GB-Mac-OS-High-Sierra',
  },
  {
    name:
      'Apple IPhone XS Max (4GB RAM, 64GB ROM) IOS 12 (12MP + 12MP)+7MP 4G Smartphone - Silver',
    description:
      'Brand new apple iPhone X Max affordable, silver color with ios 12 operating system',
    categoryId: [category._id, gamCategry._id],
    sku: 'sku12',
    specification:
      '6.5-inch Super Retina display (OLED) with HDR \n IP68 dust and water resistant (maximum depth of 2 meters up to 30 minutes) \n12MP dual cameras with dual OIS and 7MP TrueDepth front camera – Portrait mode, Portrait Lighting, Depth Control, and Smart HDR \nFace ID for secure authentication and Apple Pay \nA12 Bionic with next-generation Neural Engine \nWireless charging – works with Qi chargers \n iOS 12 with Memoji, Screen Time, Siri Shortcuts, and Group FaceTime',
    quantity: 73,
    price: { '1-50': '800000', '51-60': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Phones', 'Phones-Gadgets', 'iOS Phones', 'Apple Phones'],
    slug:
      'Apple-IPhone-XS-Max-4GB-RAM-64GB-ROM-IOS-12-12MP-12MP-7MP-4G-Smartphone-Silver',
  },
  {
    name: 'Hp 255 AMD Quad Core (500GB HDD,4GB+ 32GB Flash Drive Freedos',
    description: 'Black HP Quad Core laptop',
    categoryId: [compCategory._id],
    sku: 'sku12',
    specification:
      'Model - HP 255 AMD QUAD CORE(4 Cores) 500GB HDD 4GB RAM 32GB FLASH Processor 1.5Ghz UP TO 2.16GHz Memory - 4GB Hard disk - 500GB Graphics Card - Intel HD Graphics Screen - 15.6 HD BV LED-backlight Display SuperMulti 8X DVD-RW Network - WiFi 802.11 bgn, Bluetooth Webcam + Mic, Battery - Li-Ion 4-cell Operating system - Freedos Other - Memory card reader, Wireless, DUAL AUDIO SPEAKERS Colors- Black Mass- 3kg Warranty - 1 year',
    quantity: 193,
    price: { '1-55': '800000', '55-100': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp1_d5660r.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp2_kbiwra.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp3_lbdzgr.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: hpBrand._id,
    brandName: 'HP',
    categoryNames: ['Computer', 'Laptops', 'HP Laptops'],
    slug: 'Hp-255-AMD-Quad-Core--500GB-HDD-4GB--32GB-Flash-Drive-Freedos',
  },
  {
    name: 'Nikon D7200 DSLR Camera With 18-140mm VR Lens - Black',
    description: 'Black Nikon camera',
    categoryId: [camCategory._id],
    sku: 'sku13',
    specification:
      "Poised to deliver in the most challenging of situations, Nikon's D7200 is a versatile DX-format DSLR that caters to both still photography and video users. Featuring a 24.2MP CMOS sensor which lacks an optical low-pass filter, and an EXPEED 4 image processor, the D7200 is able to record up to 6 fps at full-resolution, or 7 fps at a 1.3x crop, with a 100-frame buffer for extended high-speed shooting. This sensor and processor combination also avails a top native sensitivity of ISO 25600, which can further be expanded to black & white-dedicated ISO 51200 and ISO 102400 sensitivities. Full HD 1080p video recording is supported up to 60 fps, and in-camera time lapse shooting with automatic exposure smoothing is possible for up to 9,999 consecutive frames. In addition to the sheer imaging benefits, the D7200 also incorporates a large 3.2\" 1,229k-dot LCD monitor, dual SD card slots, and features built-in snapbridge Wi-Fi connectivity with NFC for simple linking of your mobile device. Capable of performing in both still and video realms, the D7200 is an all-around shooter that blends sophisticated imaging technologies with refined handling and design. Rounding out its feature-set, the D7200 is also characterized by an apt 51-point AF system, with 15 cross-type points, for quick and accurate focusing in a variety of conditions. The 3D Color Matrix Metering II system, which utilizes a 2,016-pixel RGB sensor, also benefits the focusing capabilities in addition to providing precise exposure metering capabilities. Further realizing a complete imaging solution, a series of Picture Control profiles can be applied to refine the color and tonal handling of imagery. Included with the D7200 body is the wide-angle to telephoto zoom AF-S DX NIKKOR 18-140mm f/3.5-5.6G ED VR lens, which features VR image stabilization to minimize camera shake to suit working in dimly-lit conditions and with longer focal lengths. One aspherical element and one extra-low dispersion element are integrated into the lens' design to minimize aberrations and optimize image sharpness and an SWM autofocus mechanism is used to acquire focus quickly, silently, and accurately.",
    quantity: 200,
    price: { '1-100': '3000000', '100-200': '2000000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon1_wjdqhw.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon2_mjowxc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon3_asa1g4.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: nikonBrand._id,
    brandName: 'Nikon',
    categoryNames: ['Camera', 'Photography', 'Nikon Cameras'],
    slug: 'Nikon-D7200-DSLR-Camera-With-18-140mm-VR-Lens-Black',
  },
  {
    name: '6 Layers Shoes Rack With A Fabric Cover',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [hkCategory._id],
    sku: 'sku14',
    specification:
      'very trendy and strong holds shoes and has a cover for dust.It beautifies your room to the modern standard and also helps to create space. It is a must have if you want the modernise way of arranging your room.',
    quantity: 15,
    price: { '1-5': '40000', '5-15': '35000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093931/garahub/products/shoerack_dkx8wg.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug: '6-Layers-Shoes-Rack-With-A-Fabric-Cover',
  },
  {
    name: 'X6 PSP Video Game Console Portable Handheld Game Player 4.3"',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [gamCategry._id],
    sku: 'sku14',
    specification:
      "This is a gorgeous player console, seriously the screen is so sharp and the games look awesome and it plays like butter, but please note that the machine come with 10,000 games preloaded, but many are repeated and it's really just 100 games over and over\nEveryone selling this machine is selling the same thing, we are just being straightforward with you and letting you know the reality. The point is the game device has a very large capacity of games and the manufacturer showcases this ability by preloading with 10,000 entries, eventhough they are repreated. You can download unlimited games, and you can fill it up with 10,000 games and it would handle it easily,and downloading into the unit is made super easy via connected cable to your PC.\nEverything you need for ultimate multimedia excitement! Still looking for fast action gaming, full-featured movie watching, stereo music listening, digital photographs displaying, picture taking and video recording, this very six-in-one console does it all together plus more! With a dazzling 4.3-inch widescreen, built-in fun games come to life no matter whenever you want and wherever you are\nIts ergonomic design fits comfortably in your hands for hours of gaming and comes with all of the essentials for on the road entertainment. Enjoy storing your digital photos and sharing them with your best friends and your beloved family\n100% Top quality with basical packaging. 10000 games built-in, you can play whenever and wherever you like. 4.3-inch (480x272) full color high-speed crisp TFT widescreen. Stereo music steaming A large variety of supporting formats for music, photos and videos. Setting Function: Support setting and reading of various functions and properties. Store digital photos, music, videos, and movies and share them with your friends and family. Built-in 8GB memory\nAcoustic technology for gilding room design, high sound quality. Super lightweight design, comfortably fit for any ear. Suitable for a variety of sports.",
    quantity: 20,
    price: { '1-10': '130000', '10-15': '110000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094009/garahub/products/psp1_m2ggzl.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094010/garahub/products/psp2_cnlhgf.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: sonyBrand._id,
    brandName: 'Sony',
    categoryNames: ['Gaming', 'Playstation'],
    slug: 'X6-PSP-Video-Game-Console-Portable-Handheld-Game-Player-4-3',
  },
  {
    name:
      'Samsung Galaxy Note 10 Plus (Note 10+) 6.8-Inch (12GB RAM, 256GB ROM), (12MP + 16MP) Dual SIM 4,300 MAh Smartphone - Aura Black"',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, category._id],
    sku: 'sku15',
    specification:
      "Few smartphones are quite as legendary and influential as the Galaxy Note line. Over the years since the Note N7000, back in 2011, Note handsets have pushed many envelopes. Putting productivity and consumer needs first is what helped the Galaxy Notes define the phablet category and bring new life to the stylus accessory. \nEight or so years later the Galaxy Note family has an incredible weight on its shoulders and more than a few uphill battles to fight at the same time. So they've approached these challenges by delivering two distinct Note10 this year - the Galaxy Note10 and its Note10+ sibling.",
    quantity: 11,
    price: { '1-3': '700000', '4-8': '650000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094147/garahub/products/samsung1_bg4wq1.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung2_qh5rqs.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung3_cjujrn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: samsungBrand._id,
    brandName: 'Samsung',
    categoryNames: [
      'Phones',
      'Phones-Gadgets',
      'Samsung Phones',
      'Android Phones',
    ],
    slug:
      'Samsung-Galaxy-Note-10-Plus-Note-10-6-8-Inch-12GB-RAM-256GB-ROM-12MP-16MP-Dual-SIM-4-300-MAh-Smartphone-Aura-Black',
  },
  {
    name:
      'Professional Gaming Headset Stereo Led Headphones With Mic For PS4 Xbox One Phone - Black & Blue',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, headCategory._id],
    sku: 'sku15',
    specification:
      'Features: \nHigh precision 40mm driver, bring you vivid sound field, sound clarity, sound shock feeling, capable of various games. \nAmbient noise isolation. \n3.5mm connector, it is suitable for iPhone 6 / 6 Plus, Samsung S5, S4, LG, Xiaomi, iPad, PC, laptop, tablet, etc. \nEarmuffs used with skin-friendly leather material, and super soft Over-ear pads that is more comfortable for long time wear. \nGlaring LED lights are designed on the earcups, highlighting the atmosphere of the game. \nPVC wire, durable tensile effectively reduce the external resistance; cable tie, prevent the line twining.\nLine is equipped with a rotary volume controller, one key Mic mute, more convenient to use.\nExquisite craftsmanship and fashion appearance.\nProfessional gaming headset for your choice.\nSpecifications: \nModel: GM-1 \nColor: Black-red, Black-blue \nHeadphone size: Approx. 95*215*205mm/ 3 7*8.5*8.1in\nPackage content:\n1 * GM-1 Headphone',
    quantity: 20,
    price: { '1-10': '90000', '11-20': '85999' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset1_iut5gf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset2_pln1lf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset4_prtknh.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset3_ani5fn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug:
      'Professional-Gaming-Headset-Stereo-Led-Headphones-With-Mic-For-PS4-Xbox-One-Phone-Black-Blue',
  },
  {
    name: 'Apple Mac-book Pro 2017 16gb 256ssd Core I7 Quality Brand',
    description: 'Macbook Pro 2017 16gb 256ssd core i7',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      'SKU: AP044EL0U3Q08NAFAMZ\nDisplay Size (inches): 15.0\nRAM (GB): 256\nHard Disk (GB): 256\nMegapixels: 0.0\nOperating System: Mac OS X\nInternal Memory(GB): 16\nColor: N/A\nMain Material: N/A\nModel: N/A\nProduct Line: DaDiva\nWeight (kg): 2',
    quantity: 5,
    price: { '1-2': '1300000', '2-5': '1120000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac1_snusta.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac2_asx44i.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Laptops', 'Apple Laptops', 'Mac Books'],
    slug: 'Apple-Mac-book-Pro-2017-16gb-256ssd-Core-I7-Quality-Brand',
  },
  {
    name:
      'Infinix S5 Lite X652C-DUAL SIM-32GB ROM-3GB RAM-4G-16MP-TRIPLE AI CAMERA-4000 MAh-FINGERPRINT-VIOLET',
    description:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look.',
    categoryId: [gadgetCategory._id],
    sku: 'sku16',
    specification:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look. You probably might confuse the S5 lite for a smartphone from another brand. This goes to say Infinix went beyond the norm.\nThe beautiful design of the handset is a product of Infinix’s move to making their smartphones fit into the current trend of smartphones with classy design.',
    quantity: 23,
    price: { '1-10': '400000', '10-30': '250000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094913/garahub/products/infinix_xkd2h7.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Infinix',
    slug:
      'Infinix-S5-Lite-X652C-DUAL-SIM-32GB-ROM-3GB-RAM-4G-16MP-TRIPLE-AI-CAMERA-4000-MAh-FINGERPRINT-VIOLET',
  },
  {
    name: 'Binatone Blender And Smoothie Maker BLS-360',
    description:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home.',
    categoryId: [hkCategory._id],
    sku: 'sku16',
    specification:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home. It is a safe and healthy way of blending and grinding food in the kitchen. It is better than the old and crude way of grinding pepper in our homes. Staying healthy requires that you eat balanced meals, to help you prepare these meals conveniently; you need the right appliances. This Binatone Blender/Smoothie will make food preparing absolute fun! ',
    quantity: 9,
    price: { '1-10': '100000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender1_fmttjn.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender3_msc74f.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender2_ff4mhc.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Binatone',
    categoryNames: ['Home-Kitchen', 'Home', 'kitchen'],
    slug: 'Binatone-Blender-And-Smoothie-Maker-BLS-360',
  },
  {
    name:
      'Apple 2017 IMac 27" With Retina 5K-Intel Core I5 (7th Gen) 3.4 GHz (Quad-Core)- 8GB RAM- 1TH FUSION- AMD Radeon Pro 570 Graphics Card (4GB)- Mac OS High Sierra',
    description:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core)',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core), 27" 5120 x 2880 IPS Retina 5K Display, AMD Radeon Pro 570 Graphics Card (4GB) of VRAM, 8GB of DDR4 RAM - 1TB Fusion Drive, UHS-II SDXC Card Reader, Thunderbolt 3, USB 3.0 Type-A, 802.11ac Wi-Fi, Bluetooth 4.2, 1 x Gigabit Ethernet Port, 2 x DisplayPort via Thunderbolt Port, User-Facing: 720p Video, Magic Keyboard & Magic Mouse 2 Included, Mac OS High Sierr',
    quantity: 20,
    price: { '1-10': '8000000', '11-20': '7280000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac1_nxhssc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac2_waxxnp.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac3_ed6onr.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac4_h14mkq.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Desktops', 'Apple Desktops', 'iMac'],
    slug:
      'Apple-2017-IMac-27-With-Retina-5K-Intel-Core-I5-7th-Gen-3-4-GHz-Quad-Core-8GB-RAM-1TH-FUSION-AMD-Radeon-Pro-570-Graphics-Card-4GB-Mac-OS-High-Sierra',
  },
  {
    name:
      'Apple IPhone XS Max (4GB RAM, 64GB ROM) IOS 12 (12MP + 12MP)+7MP 4G Smartphone - Silver',
    description:
      'Brand new apple iPhone X Max affordable, silver color with ios 12 operating system',
    categoryId: [category._id, gamCategry._id],
    sku: 'sku12',
    specification:
      '6.5-inch Super Retina display (OLED) with HDR \n IP68 dust and water resistant (maximum depth of 2 meters up to 30 minutes) \n12MP dual cameras with dual OIS and 7MP TrueDepth front camera – Portrait mode, Portrait Lighting, Depth Control, and Smart HDR \nFace ID for secure authentication and Apple Pay \nA12 Bionic with next-generation Neural Engine \nWireless charging – works with Qi chargers \n iOS 12 with Memoji, Screen Time, Siri Shortcuts, and Group FaceTime',
    quantity: 73,
    price: { '1-50': '800000', '51-60': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Phones', 'Phones-Gadgets', 'Mobile Phones', 'iOS Phones'],
    slug:
      'Apple-IPhone-XS-Max-4GB-RAM-64GB-ROM-IOS-12-12MP-12MP-7MP-4G-Smartphone-Silver',
  },
  {
    name: 'Hp 255 AMD Quad Core (500GB HDD,4GB+ 32GB Flash Drive Freedos',
    description: 'Black HP Quad Core laptop',
    categoryId: [compCategory._id],
    sku: 'sku12',
    specification:
      'Model - HP 255 AMD QUAD CORE(4 Cores) 500GB HDD 4GB RAM 32GB FLASH Processor 1.5Ghz UP TO 2.16GHz Memory - 4GB Hard disk - 500GB Graphics Card - Intel HD Graphics Screen - 15.6 HD BV LED-backlight Display SuperMulti 8X DVD-RW Network - WiFi 802.11 bgn, Bluetooth Webcam + Mic, Battery - Li-Ion 4-cell Operating system - Freedos Other - Memory card reader, Wireless, DUAL AUDIO SPEAKERS Colors- Black Mass- 3kg Warranty - 1 year',
    quantity: 193,
    price: { '1-55': '800000', '55-100': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp1_d5660r.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp2_kbiwra.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp3_lbdzgr.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: hpBrand._id,
    brandName: 'HP',
    categoryNames: ['Computer', 'Laptops', 'HP Laptops'],
    slug: 'Hp-255-AMD-Quad-Core--500GB-HDD-4GB--32GB-Flash-Drive-Freedos',
  },
  {
    name: 'Nikon D7200 DSLR Camera With 18-140mm VR Lens - Black',
    description: 'Black Nikon camera',
    categoryId: [camCategory._id],
    sku: 'sku13',
    specification:
      "Poised to deliver in the most challenging of situations, Nikon's D7200 is a versatile DX-format DSLR that caters to both still photography and video users. Featuring a 24.2MP CMOS sensor which lacks an optical low-pass filter, and an EXPEED 4 image processor, the D7200 is able to record up to 6 fps at full-resolution, or 7 fps at a 1.3x crop, with a 100-frame buffer for extended high-speed shooting. This sensor and processor combination also avails a top native sensitivity of ISO 25600, which can further be expanded to black & white-dedicated ISO 51200 and ISO 102400 sensitivities. Full HD 1080p video recording is supported up to 60 fps, and in-camera time lapse shooting with automatic exposure smoothing is possible for up to 9,999 consecutive frames. In addition to the sheer imaging benefits, the D7200 also incorporates a large 3.2\" 1,229k-dot LCD monitor, dual SD card slots, and features built-in snapbridge Wi-Fi connectivity with NFC for simple linking of your mobile device. Capable of performing in both still and video realms, the D7200 is an all-around shooter that blends sophisticated imaging technologies with refined handling and design. Rounding out its feature-set, the D7200 is also characterized by an apt 51-point AF system, with 15 cross-type points, for quick and accurate focusing in a variety of conditions. The 3D Color Matrix Metering II system, which utilizes a 2,016-pixel RGB sensor, also benefits the focusing capabilities in addition to providing precise exposure metering capabilities. Further realizing a complete imaging solution, a series of Picture Control profiles can be applied to refine the color and tonal handling of imagery. Included with the D7200 body is the wide-angle to telephoto zoom AF-S DX NIKKOR 18-140mm f/3.5-5.6G ED VR lens, which features VR image stabilization to minimize camera shake to suit working in dimly-lit conditions and with longer focal lengths. One aspherical element and one extra-low dispersion element are integrated into the lens' design to minimize aberrations and optimize image sharpness and an SWM autofocus mechanism is used to acquire focus quickly, silently, and accurately.",
    quantity: 200,
    price: { '1-100': '3000000', '100-200': '2000000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon1_wjdqhw.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon2_mjowxc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon3_asa1g4.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: nikonBrand._id,
    brandName: 'Nikon',
    categoryNames: ['Camera', 'Photography', 'Nikon Cameras'],
    slug: 'Nikon-D7200-DSLR-Camera-With-18-140mm-VR-Lens-Black',
  },
  {
    name: '6 Layers Shoes Rack With A Fabric Cover',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [hkCategory._id],
    sku: 'sku14',
    specification:
      'very trendy and strong holds shoes and has a cover for dust.It beautifies your room to the modern standard and also helps to create space. It is a must have if you want the modernise way of arranging your room.',
    quantity: 15,
    price: { '1-5': '40000', '5-15': '35000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093931/garahub/products/shoerack_dkx8wg.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug: '6-Layers-Shoes-Rack-With-A-Fabric-Cover',
  },
  {
    name: 'X6 PSP Video Game Console Portable Handheld Game Player 4.3"',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [gamCategry._id],
    sku: 'sku14',
    specification:
      "This is a gorgeous player console, seriously the screen is so sharp and the games look awesome and it plays like butter, but please note that the machine come with 10,000 games preloaded, but many are repeated and it's really just 100 games over and over\nEveryone selling this machine is selling the same thing, we are just being straightforward with you and letting you know the reality. The point is the game device has a very large capacity of games and the manufacturer showcases this ability by preloading with 10,000 entries, eventhough they are repreated. You can download unlimited games, and you can fill it up with 10,000 games and it would handle it easily,and downloading into the unit is made super easy via connected cable to your PC.\nEverything you need for ultimate multimedia excitement! Still looking for fast action gaming, full-featured movie watching, stereo music listening, digital photographs displaying, picture taking and video recording, this very six-in-one console does it all together plus more! With a dazzling 4.3-inch widescreen, built-in fun games come to life no matter whenever you want and wherever you are\nIts ergonomic design fits comfortably in your hands for hours of gaming and comes with all of the essentials for on the road entertainment. Enjoy storing your digital photos and sharing them with your best friends and your beloved family\n100% Top quality with basical packaging. 10000 games built-in, you can play whenever and wherever you like. 4.3-inch (480x272) full color high-speed crisp TFT widescreen. Stereo music steaming A large variety of supporting formats for music, photos and videos. Setting Function: Support setting and reading of various functions and properties. Store digital photos, music, videos, and movies and share them with your friends and family. Built-in 8GB memory\nAcoustic technology for gilding room design, high sound quality. Super lightweight design, comfortably fit for any ear. Suitable for a variety of sports.",
    quantity: 20,
    price: { '1-10': '130000', '10-15': '110000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094009/garahub/products/psp1_m2ggzl.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094010/garahub/products/psp2_cnlhgf.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: sonyBrand._id,
    brandName: 'Sony',
    categoryNames: ['Gaming', 'Playstation'],
    slug: 'X6-PSP-Video-Game-Console-Portable-Handheld-Game-Player-4-3',
  },
  {
    name:
      'Samsung Galaxy Note 10 Plus (Note 10+) 6.8-Inch (12GB RAM, 256GB ROM), (12MP + 16MP) Dual SIM 4,300 MAh Smartphone - Aura Black"',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id],
    sku: 'sku15',
    specification:
      "Few smartphones are quite as legendary and influential as the Galaxy Note line. Over the years since the Note N7000, back in 2011, Note handsets have pushed many envelopes. Putting productivity and consumer needs first is what helped the Galaxy Notes define the phablet category and bring new life to the stylus accessory. \nEight or so years later the Galaxy Note family has an incredible weight on its shoulders and more than a few uphill battles to fight at the same time. So they've approached these challenges by delivering two distinct Note10 this year - the Galaxy Note10 and its Note10+ sibling.",
    quantity: 11,
    price: { '1-3': '700000', '4-8': '650000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094147/garahub/products/samsung1_bg4wq1.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung2_qh5rqs.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung3_cjujrn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: samsungBrand._id,
    brandName: 'Samsung',
    categoryNames: [
      'Phones',
      'Phones-Gadgets',
      'Samsung Phones',
      'Android Phones',
    ],
    slug:
      'Samsung-Galaxy-Note-10-Plus-Note-10-6-8-Inch-12GB-RAM-256GB-ROM-12MP-16MP-Dual-SIM-4-300-MAh-Smartphone-Aura-Black',
  },
  {
    name:
      'Professional Gaming Headset Stereo Led Headphones With Mic For PS4 Xbox One Phone - Black & Blue',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, headCategory._id],
    sku: 'sku15',
    specification:
      'Features: \nHigh precision 40mm driver, bring you vivid sound field, sound clarity, sound shock feeling, capable of various games. \nAmbient noise isolation. \n3.5mm connector, it is suitable for iPhone 6 / 6 Plus, Samsung S5, S4, LG, Xiaomi, iPad, PC, laptop, tablet, etc. \nEarmuffs used with skin-friendly leather material, and super soft Over-ear pads that is more comfortable for long time wear. \nGlaring LED lights are designed on the earcups, highlighting the atmosphere of the game. \nPVC wire, durable tensile effectively reduce the external resistance; cable tie, prevent the line twining.\nLine is equipped with a rotary volume controller, one key Mic mute, more convenient to use.\nExquisite craftsmanship and fashion appearance.\nProfessional gaming headset for your choice.\nSpecifications: \nModel: GM-1 \nColor: Black-red, Black-blue \nHeadphone size: Approx. 95*215*205mm/ 3 7*8.5*8.1in\nPackage content:\n1 * GM-1 Headphone',
    quantity: 20,
    price: { '1-10': '90000', '11-20': '85999' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset1_iut5gf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset2_pln1lf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset4_prtknh.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset3_ani5fn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug:
      'Professional-Gaming-Headset-Stereo-Led-Headphones-With-Mic-For-PS4-Xbox-One-Phone-Black-Blue',
  },
  {
    name: 'Apple Mac-book Pro 2017 16gb 256ssd Core I7 Quality Brand',
    description: 'Macbook Pro 2017 16gb 256ssd core i7',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      'SKU: AP044EL0U3Q08NAFAMZ\nDisplay Size (inches): 15.0\nRAM (GB): 256\nHard Disk (GB): 256\nMegapixels: 0.0\nOperating System: Mac OS X\nInternal Memory(GB): 16\nColor: N/A\nMain Material: N/A\nModel: N/A\nProduct Line: DaDiva\nWeight (kg): 2',
    quantity: 5,
    price: { '1-2': '1300000', '2-5': '1120000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac1_snusta.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac2_asx44i.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Laptops', 'Apple Laptops', 'Mac Books'],
    slug: 'Apple-Mac-book-Pro-2017-16gb-256ssd-Core-I7-Quality-Brand',
  },
  {
    name:
      'Infinix S5 Lite X652C-DUAL SIM-32GB ROM-3GB RAM-4G-16MP-TRIPLE AI CAMERA-4000 MAh-FINGERPRINT-VIOLET',
    description:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look.',
    categoryId: [gadgetCategory._id],
    sku: 'sku16',
    specification:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look. You probably might confuse the S5 lite for a smartphone from another brand. This goes to say Infinix went beyond the norm.\nThe beautiful design of the handset is a product of Infinix’s move to making their smartphones fit into the current trend of smartphones with classy design.',
    quantity: 23,
    price: { '1-10': '400000', '10-30': '250000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094913/garahub/products/infinix_xkd2h7.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Infinix',
    slug:
      'Infinix-S5-Lite-X652C-DUAL-SIM-32GB-ROM-3GB-RAM-4G-16MP-TRIPLE-AI-CAMERA-4000-MAh-FINGERPRINT-VIOLET',
  },
  {
    name: 'Binatone Blender And Smoothie Maker BLS-360',
    description:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home.',
    categoryId: [hkCategory._id],
    sku: 'sku16',
    specification:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home. It is a safe and healthy way of blending and grinding food in the kitchen. It is better than the old and crude way of grinding pepper in our homes. Staying healthy requires that you eat balanced meals, to help you prepare these meals conveniently; you need the right appliances. This Binatone Blender/Smoothie will make food preparing absolute fun! ',
    quantity: 9,
    price: { '1-10': '100000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender1_fmttjn.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender3_msc74f.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender2_ff4mhc.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Binatone',
    categoryNames: ['Home-Kitchen', 'Home', 'kitchen'],
    slug: 'Binatone-Blender-And-Smoothie-Maker-BLS-360',
  },
  {
    name:
      'Apple 2017 IMac 27" With Retina 5K-Intel Core I5 (7th Gen) 3.4 GHz (Quad-Core)- 8GB RAM- 1TH FUSION- AMD Radeon Pro 570 Graphics Card (4GB)- Mac OS High Sierra',
    description:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core)',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core), 27" 5120 x 2880 IPS Retina 5K Display, AMD Radeon Pro 570 Graphics Card (4GB) of VRAM, 8GB of DDR4 RAM - 1TB Fusion Drive, UHS-II SDXC Card Reader, Thunderbolt 3, USB 3.0 Type-A, 802.11ac Wi-Fi, Bluetooth 4.2, 1 x Gigabit Ethernet Port, 2 x DisplayPort via Thunderbolt Port, User-Facing: 720p Video, Magic Keyboard & Magic Mouse 2 Included, Mac OS High Sierr',
    quantity: 20,
    price: { '1-10': '8000000', '11-20': '7280000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac1_nxhssc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac2_waxxnp.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac3_ed6onr.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac4_h14mkq.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Desktops', 'Apple Desktops', 'iMac'],
    slug:
      'Apple-2017-IMac-27-With-Retina-5K-Intel-Core-I5-7th-Gen-3-4-GHz-Quad-Core-8GB-RAM-1TH-FUSION-AMD-Radeon-Pro-570-Graphics-Card-4GB-Mac-OS-High-Sierra',
  },
  {
    name:
      'Apple IPhone XS Max (4GB RAM, 64GB ROM) IOS 12 (12MP + 12MP)+7MP 4G Smartphone - Silver',
    description:
      'Brand new apple iPhone X Max affordable, silver color with ios 12 operating system',
    categoryId: [category._id, gamCategry._id],
    sku: 'sku12',
    specification:
      '6.5-inch Super Retina display (OLED) with HDR \n IP68 dust and water resistant (maximum depth of 2 meters up to 30 minutes) \n12MP dual cameras with dual OIS and 7MP TrueDepth front camera – Portrait mode, Portrait Lighting, Depth Control, and Smart HDR \nFace ID for secure authentication and Apple Pay \nA12 Bionic with next-generation Neural Engine \nWireless charging – works with Qi chargers \n iOS 12 with Memoji, Screen Time, Siri Shortcuts, and Group FaceTime',
    quantity: 73,
    price: { '1-50': '800000', '51-60': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Phones', 'Phones-Gadgets', 'Mobile Phones', 'iOS Phones'],
    slug:
      'Apple-IPhone-XS-Max-4GB-RAM-64GB-ROM-IOS-12-12MP-12MP-7MP-4G-Smartphone-Silver',
  },
  {
    name: 'Hp 255 AMD Quad Core (500GB HDD,4GB+ 32GB Flash Drive Freedos',
    description: 'Black HP Quad Core laptop',
    categoryId: [compCategory._id],
    sku: 'sku12',
    specification:
      'Model - HP 255 AMD QUAD CORE(4 Cores) 500GB HDD 4GB RAM 32GB FLASH Processor 1.5Ghz UP TO 2.16GHz Memory - 4GB Hard disk - 500GB Graphics Card - Intel HD Graphics Screen - 15.6 HD BV LED-backlight Display SuperMulti 8X DVD-RW Network - WiFi 802.11 bgn, Bluetooth Webcam + Mic, Battery - Li-Ion 4-cell Operating system - Freedos Other - Memory card reader, Wireless, DUAL AUDIO SPEAKERS Colors- Black Mass- 3kg Warranty - 1 year',
    quantity: 193,
    price: { '1-55': '800000', '55-100': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp1_d5660r.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp2_kbiwra.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp3_lbdzgr.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: hpBrand._id,
    brandName: 'HP',
    categoryNames: ['Computer', 'Laptops', 'HP Laptops'],
    slug: 'Hp-255-AMD-Quad-Core--500GB-HDD-4GB--32GB-Flash-Drive-Freedos',
  },
  {
    name: 'Nikon D7200 DSLR Camera With 18-140mm VR Lens - Black',
    description: 'Black Nikon camera',
    categoryId: [camCategory._id],
    sku: 'sku13',
    specification:
      "Poised to deliver in the most challenging of situations, Nikon's D7200 is a versatile DX-format DSLR that caters to both still photography and video users. Featuring a 24.2MP CMOS sensor which lacks an optical low-pass filter, and an EXPEED 4 image processor, the D7200 is able to record up to 6 fps at full-resolution, or 7 fps at a 1.3x crop, with a 100-frame buffer for extended high-speed shooting. This sensor and processor combination also avails a top native sensitivity of ISO 25600, which can further be expanded to black & white-dedicated ISO 51200 and ISO 102400 sensitivities. Full HD 1080p video recording is supported up to 60 fps, and in-camera time lapse shooting with automatic exposure smoothing is possible for up to 9,999 consecutive frames. In addition to the sheer imaging benefits, the D7200 also incorporates a large 3.2\" 1,229k-dot LCD monitor, dual SD card slots, and features built-in snapbridge Wi-Fi connectivity with NFC for simple linking of your mobile device. Capable of performing in both still and video realms, the D7200 is an all-around shooter that blends sophisticated imaging technologies with refined handling and design. Rounding out its feature-set, the D7200 is also characterized by an apt 51-point AF system, with 15 cross-type points, for quick and accurate focusing in a variety of conditions. The 3D Color Matrix Metering II system, which utilizes a 2,016-pixel RGB sensor, also benefits the focusing capabilities in addition to providing precise exposure metering capabilities. Further realizing a complete imaging solution, a series of Picture Control profiles can be applied to refine the color and tonal handling of imagery. Included with the D7200 body is the wide-angle to telephoto zoom AF-S DX NIKKOR 18-140mm f/3.5-5.6G ED VR lens, which features VR image stabilization to minimize camera shake to suit working in dimly-lit conditions and with longer focal lengths. One aspherical element and one extra-low dispersion element are integrated into the lens' design to minimize aberrations and optimize image sharpness and an SWM autofocus mechanism is used to acquire focus quickly, silently, and accurately.",
    quantity: 200,
    price: { '1-100': '3000000', '100-200': '2000000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon1_wjdqhw.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon2_mjowxc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon3_asa1g4.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: nikonBrand._id,
    brandName: 'Nikon',
    categoryNames: ['Camera', 'Photography', 'Nikon Cameras'],
    slug: 'Nikon-D7200-DSLR-Camera-With-18-140mm-VR-Lens-Black',
  },
  {
    name: '6 Layers Shoes Rack With A Fabric Cover',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [hkCategory._id],
    sku: 'sku14',
    specification:
      'very trendy and strong holds shoes and has a cover for dust.It beautifies your room to the modern standard and also helps to create space. It is a must have if you want the modernise way of arranging your room.',
    quantity: 15,
    price: { '1-5': '40000', '5-15': '35000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093931/garahub/products/shoerack_dkx8wg.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug: '6-Layers-Shoes-Rack-With-A-Fabric-Cover',
  },
  {
    name: 'X6 PSP Video Game Console Portable Handheld Game Player 4.3"',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [gamCategry._id],
    sku: 'sku14',
    specification:
      "This is a gorgeous player console, seriously the screen is so sharp and the games look awesome and it plays like butter, but please note that the machine come with 10,000 games preloaded, but many are repeated and it's really just 100 games over and over\nEveryone selling this machine is selling the same thing, we are just being straightforward with you and letting you know the reality. The point is the game device has a very large capacity of games and the manufacturer showcases this ability by preloading with 10,000 entries, eventhough they are repreated. You can download unlimited games, and you can fill it up with 10,000 games and it would handle it easily,and downloading into the unit is made super easy via connected cable to your PC.\nEverything you need for ultimate multimedia excitement! Still looking for fast action gaming, full-featured movie watching, stereo music listening, digital photographs displaying, picture taking and video recording, this very six-in-one console does it all together plus more! With a dazzling 4.3-inch widescreen, built-in fun games come to life no matter whenever you want and wherever you are\nIts ergonomic design fits comfortably in your hands for hours of gaming and comes with all of the essentials for on the road entertainment. Enjoy storing your digital photos and sharing them with your best friends and your beloved family\n100% Top quality with basical packaging. 10000 games built-in, you can play whenever and wherever you like. 4.3-inch (480x272) full color high-speed crisp TFT widescreen. Stereo music steaming A large variety of supporting formats for music, photos and videos. Setting Function: Support setting and reading of various functions and properties. Store digital photos, music, videos, and movies and share them with your friends and family. Built-in 8GB memory\nAcoustic technology for gilding room design, high sound quality. Super lightweight design, comfortably fit for any ear. Suitable for a variety of sports.",
    quantity: 20,
    price: { '1-10': '130000', '10-15': '110000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094009/garahub/products/psp1_m2ggzl.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094010/garahub/products/psp2_cnlhgf.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: sonyBrand._id,
    brandName: 'Sony',
    categoryNames: ['Gaming', 'Playstation'],
    slug: 'X6-PSP-Video-Game-Console-Portable-Handheld-Game-Player-4-3',
  },
  {
    name:
      'Samsung Galaxy Note 10 Plus (Note 10+) 6.8-Inch (12GB RAM, 256GB ROM), (12MP + 16MP) Dual SIM 4,300 MAh Smartphone - Aura Black"',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id],
    sku: 'sku15',
    specification:
      "Few smartphones are quite as legendary and influential as the Galaxy Note line. Over the years since the Note N7000, back in 2011, Note handsets have pushed many envelopes. Putting productivity and consumer needs first is what helped the Galaxy Notes define the phablet category and bring new life to the stylus accessory. \nEight or so years later the Galaxy Note family has an incredible weight on its shoulders and more than a few uphill battles to fight at the same time. So they've approached these challenges by delivering two distinct Note10 this year - the Galaxy Note10 and its Note10+ sibling.",
    quantity: 11,
    price: { '1-3': '700000', '4-8': '650000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094147/garahub/products/samsung1_bg4wq1.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung2_qh5rqs.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung3_cjujrn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: samsungBrand._id,
    brandName: 'Samsung',
    categoryNames: [
      'Phones',
      'Phones-Gadgets',
      'Samsung Phones',
      'Android Phones',
    ],
    slug:
      'Samsung-Galaxy-Note-10-Plus-Note-10-6-8-Inch-12GB-RAM-256GB-ROM-12MP-16MP-Dual-SIM-4-300-MAh-Smartphone-Aura-Black',
  },
  {
    name:
      'Professional Gaming Headset Stereo Led Headphones With Mic For PS4 Xbox One Phone - Black & Blue',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, headCategory._id],
    sku: 'sku15',
    specification:
      'Features: \nHigh precision 40mm driver, bring you vivid sound field, sound clarity, sound shock feeling, capable of various games. \nAmbient noise isolation. \n3.5mm connector, it is suitable for iPhone 6 / 6 Plus, Samsung S5, S4, LG, Xiaomi, iPad, PC, laptop, tablet, etc. \nEarmuffs used with skin-friendly leather material, and super soft Over-ear pads that is more comfortable for long time wear. \nGlaring LED lights are designed on the earcups, highlighting the atmosphere of the game. \nPVC wire, durable tensile effectively reduce the external resistance; cable tie, prevent the line twining.\nLine is equipped with a rotary volume controller, one key Mic mute, more convenient to use.\nExquisite craftsmanship and fashion appearance.\nProfessional gaming headset for your choice.\nSpecifications: \nModel: GM-1 \nColor: Black-red, Black-blue \nHeadphone size: Approx. 95*215*205mm/ 3 7*8.5*8.1in\nPackage content:\n1 * GM-1 Headphone',
    quantity: 20,
    price: { '1-10': '90000', '11-20': '85999' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset1_iut5gf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset2_pln1lf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset4_prtknh.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset3_ani5fn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug:
      'Professional-Gaming-Headset-Stereo-Led-Headphones-With-Mic-For-PS4-Xbox-One-Phone-Black-Blue',
  },
  {
    name: 'Apple Mac-book Pro 2017 16gb 256ssd Core I7 Quality Brand',
    description: 'Macbook Pro 2017 16gb 256ssd core i7',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      'SKU: AP044EL0U3Q08NAFAMZ\nDisplay Size (inches): 15.0\nRAM (GB): 256\nHard Disk (GB): 256\nMegapixels: 0.0\nOperating System: Mac OS X\nInternal Memory(GB): 16\nColor: N/A\nMain Material: N/A\nModel: N/A\nProduct Line: DaDiva\nWeight (kg): 2',
    quantity: 5,
    price: { '1-2': '1300000', '2-5': '1120000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac1_snusta.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac2_asx44i.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Laptops', 'Apple Laptops', 'Mac Books'],
    slug: 'Apple-Mac-book-Pro-2017-16gb-256ssd-Core-I7-Quality-Brand',
  },
  {
    name:
      'Infinix S5 Lite X652C-DUAL SIM-32GB ROM-3GB RAM-4G-16MP-TRIPLE AI CAMERA-4000 MAh-FINGERPRINT-VIOLET',
    description:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look.',
    categoryId: [gadgetCategory._id],
    sku: 'sku16',
    specification:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look. You probably might confuse the S5 lite for a smartphone from another brand. This goes to say Infinix went beyond the norm.\nThe beautiful design of the handset is a product of Infinix’s move to making their smartphones fit into the current trend of smartphones with classy design.',
    quantity: 23,
    price: { '1-10': '400000', '10-30': '250000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094913/garahub/products/infinix_xkd2h7.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Infinix',
    slug:
      'Infinix-S5-Lite-X652C-DUAL-SIM-32GB-ROM-3GB-RAM-4G-16MP-TRIPLE-AI-CAMERA-4000-MAh-FINGERPRINT-VIOLET',
  },
  {
    name: 'Binatone Blender And Smoothie Maker BLS-360',
    description:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home.',
    categoryId: [hkCategory._id],
    sku: 'sku16',
    specification:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home. It is a safe and healthy way of blending and grinding food in the kitchen. It is better than the old and crude way of grinding pepper in our homes. Staying healthy requires that you eat balanced meals, to help you prepare these meals conveniently; you need the right appliances. This Binatone Blender/Smoothie will make food preparing absolute fun! ',
    quantity: 9,
    price: { '1-10': '100000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender1_fmttjn.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender3_msc74f.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender2_ff4mhc.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Binatone',
    categoryNames: ['Home-Kitchen', 'Home', 'kitchen'],
    slug: 'Binatone-Blender-And-Smoothie-Maker-BLS-360',
  },
  {
    name:
      'Apple 2017 IMac 27" With Retina 5K-Intel Core I5 (7th Gen) 3.4 GHz (Quad-Core)- 8GB RAM- 1TH FUSION- AMD Radeon Pro 570 Graphics Card (4GB)- Mac OS High Sierra',
    description:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core)',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core), 27" 5120 x 2880 IPS Retina 5K Display, AMD Radeon Pro 570 Graphics Card (4GB) of VRAM, 8GB of DDR4 RAM - 1TB Fusion Drive, UHS-II SDXC Card Reader, Thunderbolt 3, USB 3.0 Type-A, 802.11ac Wi-Fi, Bluetooth 4.2, 1 x Gigabit Ethernet Port, 2 x DisplayPort via Thunderbolt Port, User-Facing: 720p Video, Magic Keyboard & Magic Mouse 2 Included, Mac OS High Sierr',
    quantity: 20,
    price: { '1-10': '8000000', '11-20': '7280000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac1_nxhssc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac2_waxxnp.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac3_ed6onr.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac4_h14mkq.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Desktops', 'Apple Desktops', 'iMac'],
    slug:
      'Apple-2017-IMac-27-With-Retina-5K-Intel-Core-I5-7th-Gen-3-4-GHz-Quad-Core-8GB-RAM-1TH-FUSION-AMD-Radeon-Pro-570-Graphics-Card-4GB-Mac-OS-High-Sierra',
  },
  {
    name:
      'Apple IPhone XS Max (4GB RAM, 64GB ROM) IOS 12 (12MP + 12MP)+7MP 4G Smartphone - Silver',
    description:
      'Brand new apple iPhone X Max affordable, silver color with ios 12 operating system',
    categoryId: [category._id, gamCategry._id],
    sku: 'sku12',
    specification:
      '6.5-inch Super Retina display (OLED) with HDR \n IP68 dust and water resistant (maximum depth of 2 meters up to 30 minutes) \n12MP dual cameras with dual OIS and 7MP TrueDepth front camera – Portrait mode, Portrait Lighting, Depth Control, and Smart HDR \nFace ID for secure authentication and Apple Pay \nA12 Bionic with next-generation Neural Engine \nWireless charging – works with Qi chargers \n iOS 12 with Memoji, Screen Time, Siri Shortcuts, and Group FaceTime',
    quantity: 73,
    price: { '1-50': '800000', '51-60': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Phones', 'Phones-Gadgets', 'Mobile Phones', 'iOS Phones'],
    slug:
      'Apple-IPhone-XS-Max-4GB-RAM-64GB-ROM-IOS-12-12MP-12MP-7MP-4G-Smartphone-Silver',
  },
  {
    name: 'Hp 255 AMD Quad Core (500GB HDD,4GB+ 32GB Flash Drive Freedos',
    description: 'Black HP Quad Core laptop',
    categoryId: [compCategory._id],
    sku: 'sku12',
    specification:
      'Model - HP 255 AMD QUAD CORE(4 Cores) 500GB HDD 4GB RAM 32GB FLASH Processor 1.5Ghz UP TO 2.16GHz Memory - 4GB Hard disk - 500GB Graphics Card - Intel HD Graphics Screen - 15.6 HD BV LED-backlight Display SuperMulti 8X DVD-RW Network - WiFi 802.11 bgn, Bluetooth Webcam + Mic, Battery - Li-Ion 4-cell Operating system - Freedos Other - Memory card reader, Wireless, DUAL AUDIO SPEAKERS Colors- Black Mass- 3kg Warranty - 1 year',
    quantity: 193,
    price: { '1-55': '800000', '55-100': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp1_d5660r.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp2_kbiwra.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp3_lbdzgr.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: hpBrand._id,
    brandName: 'HP',
    categoryNames: ['Computer', 'Laptops', 'HP Laptops'],
    slug: 'Hp-255-AMD-Quad-Core--500GB-HDD-4GB--32GB-Flash-Drive-Freedos',
  },
  {
    name: 'Nikon D7200 DSLR Camera With 18-140mm VR Lens - Black',
    description: 'Black Nikon camera',
    categoryId: [camCategory._id],
    sku: 'sku13',
    specification:
      "Poised to deliver in the most challenging of situations, Nikon's D7200 is a versatile DX-format DSLR that caters to both still photography and video users. Featuring a 24.2MP CMOS sensor which lacks an optical low-pass filter, and an EXPEED 4 image processor, the D7200 is able to record up to 6 fps at full-resolution, or 7 fps at a 1.3x crop, with a 100-frame buffer for extended high-speed shooting. This sensor and processor combination also avails a top native sensitivity of ISO 25600, which can further be expanded to black & white-dedicated ISO 51200 and ISO 102400 sensitivities. Full HD 1080p video recording is supported up to 60 fps, and in-camera time lapse shooting with automatic exposure smoothing is possible for up to 9,999 consecutive frames. In addition to the sheer imaging benefits, the D7200 also incorporates a large 3.2\" 1,229k-dot LCD monitor, dual SD card slots, and features built-in snapbridge Wi-Fi connectivity with NFC for simple linking of your mobile device. Capable of performing in both still and video realms, the D7200 is an all-around shooter that blends sophisticated imaging technologies with refined handling and design. Rounding out its feature-set, the D7200 is also characterized by an apt 51-point AF system, with 15 cross-type points, for quick and accurate focusing in a variety of conditions. The 3D Color Matrix Metering II system, which utilizes a 2,016-pixel RGB sensor, also benefits the focusing capabilities in addition to providing precise exposure metering capabilities. Further realizing a complete imaging solution, a series of Picture Control profiles can be applied to refine the color and tonal handling of imagery. Included with the D7200 body is the wide-angle to telephoto zoom AF-S DX NIKKOR 18-140mm f/3.5-5.6G ED VR lens, which features VR image stabilization to minimize camera shake to suit working in dimly-lit conditions and with longer focal lengths. One aspherical element and one extra-low dispersion element are integrated into the lens' design to minimize aberrations and optimize image sharpness and an SWM autofocus mechanism is used to acquire focus quickly, silently, and accurately.",
    quantity: 200,
    price: { '1-100': '3000000', '100-200': '2000000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon1_wjdqhw.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon2_mjowxc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon3_asa1g4.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: nikonBrand._id,
    brandName: 'Nikon',
    categoryNames: ['Camera', 'Photography', 'Nikon Cameras'],
    slug: 'Nikon-D7200-DSLR-Camera-With-18-140mm-VR-Lens-Black',
  },
  {
    name: '6 Layers Shoes Rack With A Fabric Cover',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [hkCategory._id],
    sku: 'sku14',
    specification:
      'very trendy and strong holds shoes and has a cover for dust.It beautifies your room to the modern standard and also helps to create space. It is a must have if you want the modernise way of arranging your room.',
    quantity: 15,
    price: { '1-5': '40000', '5-15': '35000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093931/garahub/products/shoerack_dkx8wg.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug: '6-Layers-Shoes-Rack-With-A-Fabric-Cover',
  },
  {
    name: 'X6 PSP Video Game Console Portable Handheld Game Player 4.3"',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [gamCategry._id],
    sku: 'sku14',
    specification:
      "This is a gorgeous player console, seriously the screen is so sharp and the games look awesome and it plays like butter, but please note that the machine come with 10,000 games preloaded, but many are repeated and it's really just 100 games over and over\nEveryone selling this machine is selling the same thing, we are just being straightforward with you and letting you know the reality. The point is the game device has a very large capacity of games and the manufacturer showcases this ability by preloading with 10,000 entries, eventhough they are repreated. You can download unlimited games, and you can fill it up with 10,000 games and it would handle it easily,and downloading into the unit is made super easy via connected cable to your PC.\nEverything you need for ultimate multimedia excitement! Still looking for fast action gaming, full-featured movie watching, stereo music listening, digital photographs displaying, picture taking and video recording, this very six-in-one console does it all together plus more! With a dazzling 4.3-inch widescreen, built-in fun games come to life no matter whenever you want and wherever you are\nIts ergonomic design fits comfortably in your hands for hours of gaming and comes with all of the essentials for on the road entertainment. Enjoy storing your digital photos and sharing them with your best friends and your beloved family\n100% Top quality with basical packaging. 10000 games built-in, you can play whenever and wherever you like. 4.3-inch (480x272) full color high-speed crisp TFT widescreen. Stereo music steaming A large variety of supporting formats for music, photos and videos. Setting Function: Support setting and reading of various functions and properties. Store digital photos, music, videos, and movies and share them with your friends and family. Built-in 8GB memory\nAcoustic technology for gilding room design, high sound quality. Super lightweight design, comfortably fit for any ear. Suitable for a variety of sports.",
    quantity: 20,
    price: { '1-10': '130000', '10-15': '110000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094009/garahub/products/psp1_m2ggzl.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094010/garahub/products/psp2_cnlhgf.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: sonyBrand._id,
    brandName: 'Sony',
    categoryNames: ['Gaming', 'Playstation'],
    slug: 'X6-PSP-Video-Game-Console-Portable-Handheld-Game-Player-4-3',
  },
  {
    name:
      'Samsung Galaxy Note 10 Plus (Note 10+) 6.8-Inch (12GB RAM, 256GB ROM), (12MP + 16MP) Dual SIM 4,300 MAh Smartphone - Aura Black"',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, category._id],
    sku: 'sku15',
    specification:
      "Few smartphones are quite as legendary and influential as the Galaxy Note line. Over the years since the Note N7000, back in 2011, Note handsets have pushed many envelopes. Putting productivity and consumer needs first is what helped the Galaxy Notes define the phablet category and bring new life to the stylus accessory. \nEight or so years later the Galaxy Note family has an incredible weight on its shoulders and more than a few uphill battles to fight at the same time. So they've approached these challenges by delivering two distinct Note10 this year - the Galaxy Note10 and its Note10+ sibling.",
    quantity: 11,
    price: { '1-3': '700000', '4-8': '650000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094147/garahub/products/samsung1_bg4wq1.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung2_qh5rqs.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung3_cjujrn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: samsungBrand._id,
    brandName: 'Samsung',
    categoryNames: [
      'Phones',
      'Phones-Gadgets',
      'Samsung Phones',
      'Android Phones',
    ],
    slug:
      'Samsung-Galaxy-Note-10-Plus-Note-10-6-8-Inch-12GB-RAM-256GB-ROM-12MP-16MP-Dual-SIM-4-300-MAh-Smartphone-Aura-Black',
  },
  {
    name:
      'Professional Gaming Headset Stereo Led Headphones With Mic For PS4 Xbox One Phone - Black & Blue',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, headCategory._id],
    sku: 'sku15',
    specification:
      'Features: \nHigh precision 40mm driver, bring you vivid sound field, sound clarity, sound shock feeling, capable of various games. \nAmbient noise isolation. \n3.5mm connector, it is suitable for iPhone 6 / 6 Plus, Samsung S5, S4, LG, Xiaomi, iPad, PC, laptop, tablet, etc. \nEarmuffs used with skin-friendly leather material, and super soft Over-ear pads that is more comfortable for long time wear. \nGlaring LED lights are designed on the earcups, highlighting the atmosphere of the game. \nPVC wire, durable tensile effectively reduce the external resistance; cable tie, prevent the line twining.\nLine is equipped with a rotary volume controller, one key Mic mute, more convenient to use.\nExquisite craftsmanship and fashion appearance.\nProfessional gaming headset for your choice.\nSpecifications: \nModel: GM-1 \nColor: Black-red, Black-blue \nHeadphone size: Approx. 95*215*205mm/ 3 7*8.5*8.1in\nPackage content:\n1 * GM-1 Headphone',
    quantity: 20,
    price: { '1-10': '90000', '11-20': '85999' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset1_iut5gf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset2_pln1lf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset4_prtknh.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset3_ani5fn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug:
      'Professional-Gaming-Headset-Stereo-Led-Headphones-With-Mic-For-PS4-Xbox-One-Phone-Black-Blue',
  },
  {
    name: 'Apple Mac-book Pro 2017 16gb 256ssd Core I7 Quality Brand',
    description: 'Macbook Pro 2017 16gb 256ssd core i7',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      'SKU: AP044EL0U3Q08NAFAMZ\nDisplay Size (inches): 15.0\nRAM (GB): 256\nHard Disk (GB): 256\nMegapixels: 0.0\nOperating System: Mac OS X\nInternal Memory(GB): 16\nColor: N/A\nMain Material: N/A\nModel: N/A\nProduct Line: DaDiva\nWeight (kg): 2',
    quantity: 5,
    price: { '1-2': '1300000', '2-5': '1120000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac1_snusta.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac2_asx44i.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Laptops', 'Apple Laptops', 'Mac Books'],
    slug: 'Apple-Mac-book-Pro-2017-16gb-256ssd-Core-I7-Quality-Brand',
  },
  {
    name:
      'Infinix S5 Lite X652C-DUAL SIM-32GB ROM-3GB RAM-4G-16MP-TRIPLE AI CAMERA-4000 MAh-FINGERPRINT-VIOLET',
    description:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look.',
    categoryId: [gadgetCategory._id],
    sku: 'sku16',
    specification:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look. You probably might confuse the S5 lite for a smartphone from another brand. This goes to say Infinix went beyond the norm.\nThe beautiful design of the handset is a product of Infinix’s move to making their smartphones fit into the current trend of smartphones with classy design.',
    quantity: 23,
    price: { '1-10': '400000', '10-30': '250000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094913/garahub/products/infinix_xkd2h7.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Infinix',
    slug:
      'Infinix-S5-Lite-X652C-DUAL-SIM-32GB-ROM-3GB-RAM-4G-16MP-TRIPLE-AI-CAMERA-4000-MAh-FINGERPRINT-VIOLET',
  },
  {
    name: 'Binatone Blender And Smoothie Maker BLS-360',
    description:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home.',
    categoryId: [hkCategory._id],
    sku: 'sku16',
    specification:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home. It is a safe and healthy way of blending and grinding food in the kitchen. It is better than the old and crude way of grinding pepper in our homes. Staying healthy requires that you eat balanced meals, to help you prepare these meals conveniently; you need the right appliances. This Binatone Blender/Smoothie will make food preparing absolute fun! ',
    quantity: 9,
    price: { '1-10': '100000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender1_fmttjn.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender3_msc74f.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender2_ff4mhc.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Binatone',
    categoryNames: ['Home-Kitchen', 'Home', 'kitchen'],
    slug: 'Binatone-Blender-And-Smoothie-Maker-BLS-360',
  },
  {
    name:
      'Apple 2017 IMac 27" With Retina 5K-Intel Core I5 (7th Gen) 3.4 GHz (Quad-Core)- 8GB RAM- 1TH FUSION- AMD Radeon Pro 570 Graphics Card (4GB)- Mac OS High Sierra',
    description:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core)',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core), 27" 5120 x 2880 IPS Retina 5K Display, AMD Radeon Pro 570 Graphics Card (4GB) of VRAM, 8GB of DDR4 RAM - 1TB Fusion Drive, UHS-II SDXC Card Reader, Thunderbolt 3, USB 3.0 Type-A, 802.11ac Wi-Fi, Bluetooth 4.2, 1 x Gigabit Ethernet Port, 2 x DisplayPort via Thunderbolt Port, User-Facing: 720p Video, Magic Keyboard & Magic Mouse 2 Included, Mac OS High Sierr',
    quantity: 20,
    price: { '1-10': '8000000', '11-20': '7280000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac1_nxhssc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac2_waxxnp.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac3_ed6onr.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac4_h14mkq.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Desktops', 'Apple Desktops', 'iMac'],
    slug:
      'Apple-2017-IMac-27-With-Retina-5K-Intel-Core-I5-7th-Gen-3-4-GHz-Quad-Core-8GB-RAM-1TH-FUSION-AMD-Radeon-Pro-570-Graphics-Card-4GB-Mac-OS-High-Sierra',
  },
  {
    name: 'Hp 255 AMD Quad Core (500GB HDD,4GB+ 32GB Flash Drive Freedos',
    description: 'Black HP Quad Core laptop',
    categoryId: [compCategory._id],
    sku: 'sku12',
    specification:
      'Model - HP 255 AMD QUAD CORE(4 Cores) 500GB HDD 4GB RAM 32GB FLASH Processor 1.5Ghz UP TO 2.16GHz Memory - 4GB Hard disk - 500GB Graphics Card - Intel HD Graphics Screen - 15.6 HD BV LED-backlight Display SuperMulti 8X DVD-RW Network - WiFi 802.11 bgn, Bluetooth Webcam + Mic, Battery - Li-Ion 4-cell Operating system - Freedos Other - Memory card reader, Wireless, DUAL AUDIO SPEAKERS Colors- Black Mass- 3kg Warranty - 1 year',
    quantity: 193,
    price: { '1-55': '800000', '55-100': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp1_d5660r.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp2_kbiwra.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp3_lbdzgr.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: hpBrand._id,
    brandName: 'HP',
    categoryNames: ['Computer', 'Laptops', 'HP Laptops'],
    slug: 'Hp-255-AMD-Quad-Core--500GB-HDD-4GB--32GB-Flash-Drive-Freedos',
  },
  {
    name: '6 Layers Shoes Rack With A Fabric Cover',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [hkCategory._id],
    sku: 'sku14',
    specification:
      'very trendy and strong holds shoes and has a cover for dust.It beautifies your room to the modern standard and also helps to create space. It is a must have if you want the modernise way of arranging your room.',
    quantity: 15,
    price: { '1-5': '40000', '5-15': '35000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093931/garahub/products/shoerack_dkx8wg.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug: '6-Layers-Shoes-Rack-With-A-Fabric-Cover',
  },
  {
    name: 'X6 PSP Video Game Console Portable Handheld Game Player 4.3"',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [gamCategry._id],
    sku: 'sku14',
    specification:
      "This is a gorgeous player console, seriously the screen is so sharp and the games look awesome and it plays like butter, but please note that the machine come with 10,000 games preloaded, but many are repeated and it's really just 100 games over and over\nEveryone selling this machine is selling the same thing, we are just being straightforward with you and letting you know the reality. The point is the game device has a very large capacity of games and the manufacturer showcases this ability by preloading with 10,000 entries, eventhough they are repreated. You can download unlimited games, and you can fill it up with 10,000 games and it would handle it easily,and downloading into the unit is made super easy via connected cable to your PC.\nEverything you need for ultimate multimedia excitement! Still looking for fast action gaming, full-featured movie watching, stereo music listening, digital photographs displaying, picture taking and video recording, this very six-in-one console does it all together plus more! With a dazzling 4.3-inch widescreen, built-in fun games come to life no matter whenever you want and wherever you are\nIts ergonomic design fits comfortably in your hands for hours of gaming and comes with all of the essentials for on the road entertainment. Enjoy storing your digital photos and sharing them with your best friends and your beloved family\n100% Top quality with basical packaging. 10000 games built-in, you can play whenever and wherever you like. 4.3-inch (480x272) full color high-speed crisp TFT widescreen. Stereo music steaming A large variety of supporting formats for music, photos and videos. Setting Function: Support setting and reading of various functions and properties. Store digital photos, music, videos, and movies and share them with your friends and family. Built-in 8GB memory\nAcoustic technology for gilding room design, high sound quality. Super lightweight design, comfortably fit for any ear. Suitable for a variety of sports.",
    quantity: 20,
    price: { '1-10': '130000', '10-15': '110000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094009/garahub/products/psp1_m2ggzl.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094010/garahub/products/psp2_cnlhgf.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: sonyBrand._id,
    brandName: 'Sony',
    categoryNames: ['Gaming', 'Playstation'],
    slug: 'X6-PSP-Video-Game-Console-Portable-Handheld-Game-Player-4-3',
  },
  {
    name:
      'Samsung Galaxy Note 10 Plus (Note 10+) 6.8-Inch (12GB RAM, 256GB ROM), (12MP + 16MP) Dual SIM 4,300 MAh Smartphone - Aura Black"',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id],
    sku: 'sku15',
    specification:
      "Few smartphones are quite as legendary and influential as the Galaxy Note line. Over the years since the Note N7000, back in 2011, Note handsets have pushed many envelopes. Putting productivity and consumer needs first is what helped the Galaxy Notes define the phablet category and bring new life to the stylus accessory. \nEight or so years later the Galaxy Note family has an incredible weight on its shoulders and more than a few uphill battles to fight at the same time. So they've approached these challenges by delivering two distinct Note10 this year - the Galaxy Note10 and its Note10+ sibling.",
    quantity: 11,
    price: { '1-3': '700000', '4-8': '650000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094147/garahub/products/samsung1_bg4wq1.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung2_qh5rqs.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung3_cjujrn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: samsungBrand._id,
    brandName: 'Samsung',
    categoryNames: [
      'Phones',
      'Phones-Gadgets',
      'Samsung Phones',
      'Android Phones',
    ],
    slug:
      'Samsung-Galaxy-Note-10-Plus-Note-10-6-8-Inch-12GB-RAM-256GB-ROM-12MP-16MP-Dual-SIM-4-300-MAh-Smartphone-Aura-Black',
  },
  {
    name:
      'Professional Gaming Headset Stereo Led Headphones With Mic For PS4 Xbox One Phone - Black & Blue',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, headCategory._id],
    sku: 'sku15',
    specification:
      'Features: \nHigh precision 40mm driver, bring you vivid sound field, sound clarity, sound shock feeling, capable of various games. \nAmbient noise isolation. \n3.5mm connector, it is suitable for iPhone 6 / 6 Plus, Samsung S5, S4, LG, Xiaomi, iPad, PC, laptop, tablet, etc. \nEarmuffs used with skin-friendly leather material, and super soft Over-ear pads that is more comfortable for long time wear. \nGlaring LED lights are designed on the earcups, highlighting the atmosphere of the game. \nPVC wire, durable tensile effectively reduce the external resistance; cable tie, prevent the line twining.\nLine is equipped with a rotary volume controller, one key Mic mute, more convenient to use.\nExquisite craftsmanship and fashion appearance.\nProfessional gaming headset for your choice.\nSpecifications: \nModel: GM-1 \nColor: Black-red, Black-blue \nHeadphone size: Approx. 95*215*205mm/ 3 7*8.5*8.1in\nPackage content:\n1 * GM-1 Headphone',
    quantity: 20,
    price: { '1-10': '90000', '11-20': '85999' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset1_iut5gf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset2_pln1lf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset4_prtknh.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset3_ani5fn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug:
      'Professional-Gaming-Headset-Stereo-Led-Headphones-With-Mic-For-PS4-Xbox-One-Phone-Black-Blue',
  },
  {
    name: 'Apple Mac-book Pro 2017 16gb 256ssd Core I7 Quality Brand',
    description: 'Macbook Pro 2017 16gb 256ssd core i7',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      'SKU: AP044EL0U3Q08NAFAMZ\nDisplay Size (inches): 15.0\nRAM (GB): 256\nHard Disk (GB): 256\nMegapixels: 0.0\nOperating System: Mac OS X\nInternal Memory(GB): 16\nColor: N/A\nMain Material: N/A\nModel: N/A\nProduct Line: DaDiva\nWeight (kg): 2',
    quantity: 5,
    price: { '1-2': '1300000', '2-5': '1120000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac1_snusta.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac2_asx44i.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Laptops', 'Apple Laptops', 'Mac Books'],
    slug: 'Apple-Mac-book-Pro-2017-16gb-256ssd-Core-I7-Quality-Brand',
  },
  {
    name:
      'Infinix S5 Lite X652C-DUAL SIM-32GB ROM-3GB RAM-4G-16MP-TRIPLE AI CAMERA-4000 MAh-FINGERPRINT-VIOLET',
    description:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look.',
    categoryId: [gadgetCategory._id],
    sku: 'sku16',
    specification:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look. You probably might confuse the S5 lite for a smartphone from another brand. This goes to say Infinix went beyond the norm.\nThe beautiful design of the handset is a product of Infinix’s move to making their smartphones fit into the current trend of smartphones with classy design.',
    quantity: 23,
    price: { '1-10': '400000', '10-30': '250000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094913/garahub/products/infinix_xkd2h7.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Infinix',
    slug:
      'Infinix-S5-Lite-X652C-DUAL-SIM-32GB-ROM-3GB-RAM-4G-16MP-TRIPLE-AI-CAMERA-4000-MAh-FINGERPRINT-VIOLET',
  },
  {
    name: 'Binatone Blender And Smoothie Maker BLS-360',
    description:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home.',
    categoryId: [hkCategory._id],
    sku: 'sku16',
    specification:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home. It is a safe and healthy way of blending and grinding food in the kitchen. It is better than the old and crude way of grinding pepper in our homes. Staying healthy requires that you eat balanced meals, to help you prepare these meals conveniently; you need the right appliances. This Binatone Blender/Smoothie will make food preparing absolute fun! ',
    quantity: 9,
    price: { '1-10': '100000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender1_fmttjn.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender3_msc74f.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender2_ff4mhc.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Binatone',
    categoryNames: ['Home-Kitchen', 'Home', 'kitchen'],
    slug: 'Binatone-Blender-And-Smoothie-Maker-BLS-360',
  },
  {
    name:
      'Apple 2017 IMac 27" With Retina 5K-Intel Core I5 (7th Gen) 3.4 GHz (Quad-Core)- 8GB RAM- 1TH FUSION- AMD Radeon Pro 570 Graphics Card (4GB)- Mac OS High Sierra',
    description:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core)',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core), 27" 5120 x 2880 IPS Retina 5K Display, AMD Radeon Pro 570 Graphics Card (4GB) of VRAM, 8GB of DDR4 RAM - 1TB Fusion Drive, UHS-II SDXC Card Reader, Thunderbolt 3, USB 3.0 Type-A, 802.11ac Wi-Fi, Bluetooth 4.2, 1 x Gigabit Ethernet Port, 2 x DisplayPort via Thunderbolt Port, User-Facing: 720p Video, Magic Keyboard & Magic Mouse 2 Included, Mac OS High Sierr',
    quantity: 20,
    price: { '1-10': '8000000', '11-20': '7280000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac1_nxhssc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac2_waxxnp.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac3_ed6onr.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac4_h14mkq.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Desktops', 'Apple Desktops', 'iMac'],
    slug:
      'Apple-2017-IMac-27-With-Retina-5K-Intel-Core-I5-7th-Gen-3-4-GHz-Quad-Core-8GB-RAM-1TH-FUSION-AMD-Radeon-Pro-570-Graphics-Card-4GB-Mac-OS-High-Sierra',
  },
  {
    name: 'Hp 255 AMD Quad Core (500GB HDD,4GB+ 32GB Flash Drive Freedos',
    description: 'Black HP Quad Core laptop',
    categoryId: [compCategory._id],
    sku: 'sku12',
    specification:
      'Model - HP 255 AMD QUAD CORE(4 Cores) 500GB HDD 4GB RAM 32GB FLASH Processor 1.5Ghz UP TO 2.16GHz Memory - 4GB Hard disk - 500GB Graphics Card - Intel HD Graphics Screen - 15.6 HD BV LED-backlight Display SuperMulti 8X DVD-RW Network - WiFi 802.11 bgn, Bluetooth Webcam + Mic, Battery - Li-Ion 4-cell Operating system - Freedos Other - Memory card reader, Wireless, DUAL AUDIO SPEAKERS Colors- Black Mass- 3kg Warranty - 1 year',
    quantity: 193,
    price: { '1-55': '800000', '55-100': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp1_d5660r.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp2_kbiwra.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093584/garahub/products/hp3_lbdzgr.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: hpBrand._id,
    brandName: 'HP',
    categoryNames: ['Computer', 'Laptops', 'HP Laptops'],
    slug: 'Hp-255-AMD-Quad-Core--500GB-HDD-4GB--32GB-Flash-Drive-Freedos',
  },
  {
    name: 'Nikon D7200 DSLR Camera With 18-140mm VR Lens - Black',
    description: 'Black Nikon camera',
    categoryId: [camCategory._id],
    sku: 'sku13',
    specification:
      "Poised to deliver in the most challenging of situations, Nikon's D7200 is a versatile DX-format DSLR that caters to both still photography and video users. Featuring a 24.2MP CMOS sensor which lacks an optical low-pass filter, and an EXPEED 4 image processor, the D7200 is able to record up to 6 fps at full-resolution, or 7 fps at a 1.3x crop, with a 100-frame buffer for extended high-speed shooting. This sensor and processor combination also avails a top native sensitivity of ISO 25600, which can further be expanded to black & white-dedicated ISO 51200 and ISO 102400 sensitivities. Full HD 1080p video recording is supported up to 60 fps, and in-camera time lapse shooting with automatic exposure smoothing is possible for up to 9,999 consecutive frames. In addition to the sheer imaging benefits, the D7200 also incorporates a large 3.2\" 1,229k-dot LCD monitor, dual SD card slots, and features built-in snapbridge Wi-Fi connectivity with NFC for simple linking of your mobile device. Capable of performing in both still and video realms, the D7200 is an all-around shooter that blends sophisticated imaging technologies with refined handling and design. Rounding out its feature-set, the D7200 is also characterized by an apt 51-point AF system, with 15 cross-type points, for quick and accurate focusing in a variety of conditions. The 3D Color Matrix Metering II system, which utilizes a 2,016-pixel RGB sensor, also benefits the focusing capabilities in addition to providing precise exposure metering capabilities. Further realizing a complete imaging solution, a series of Picture Control profiles can be applied to refine the color and tonal handling of imagery. Included with the D7200 body is the wide-angle to telephoto zoom AF-S DX NIKKOR 18-140mm f/3.5-5.6G ED VR lens, which features VR image stabilization to minimize camera shake to suit working in dimly-lit conditions and with longer focal lengths. One aspherical element and one extra-low dispersion element are integrated into the lens' design to minimize aberrations and optimize image sharpness and an SWM autofocus mechanism is used to acquire focus quickly, silently, and accurately.",
    quantity: 200,
    price: { '1-100': '3000000', '100-200': '2000000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon1_wjdqhw.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon2_mjowxc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon3_asa1g4.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: nikonBrand._id,
    brandName: 'Nikon',
    categoryNames: ['Camera', 'Photography', 'Nikon Cameras'],
    slug: 'Nikon-D7200-DSLR-Camera-With-18-140mm-VR-Lens-Black',
  },
  {
    name: '6 Layers Shoes Rack With A Fabric Cover',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [hkCategory._id],
    sku: 'sku14',
    specification:
      'very trendy and strong holds shoes and has a cover for dust.It beautifies your room to the modern standard and also helps to create space. It is a must have if you want the modernise way of arranging your room.',
    quantity: 15,
    price: { '1-5': '40000', '5-15': '35000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093931/garahub/products/shoerack_dkx8wg.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug: '6-Layers-Shoes-Rack-With-A-Fabric-Cover',
  },
  {
    name: 'X6 PSP Video Game Console Portable Handheld Game Player 4.3"',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [gamCategry._id],
    sku: 'sku14',
    specification:
      "This is a gorgeous player console, seriously the screen is so sharp and the games look awesome and it plays like butter, but please note that the machine come with 10,000 games preloaded, but many are repeated and it's really just 100 games over and over\nEveryone selling this machine is selling the same thing, we are just being straightforward with you and letting you know the reality. The point is the game device has a very large capacity of games and the manufacturer showcases this ability by preloading with 10,000 entries, eventhough they are repreated. You can download unlimited games, and you can fill it up with 10,000 games and it would handle it easily,and downloading into the unit is made super easy via connected cable to your PC.\nEverything you need for ultimate multimedia excitement! Still looking for fast action gaming, full-featured movie watching, stereo music listening, digital photographs displaying, picture taking and video recording, this very six-in-one console does it all together plus more! With a dazzling 4.3-inch widescreen, built-in fun games come to life no matter whenever you want and wherever you are\nIts ergonomic design fits comfortably in your hands for hours of gaming and comes with all of the essentials for on the road entertainment. Enjoy storing your digital photos and sharing them with your best friends and your beloved family\n100% Top quality with basical packaging. 10000 games built-in, you can play whenever and wherever you like. 4.3-inch (480x272) full color high-speed crisp TFT widescreen. Stereo music steaming A large variety of supporting formats for music, photos and videos. Setting Function: Support setting and reading of various functions and properties. Store digital photos, music, videos, and movies and share them with your friends and family. Built-in 8GB memory\nAcoustic technology for gilding room design, high sound quality. Super lightweight design, comfortably fit for any ear. Suitable for a variety of sports.",
    quantity: 20,
    price: { '1-10': '130000', '10-15': '110000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094009/garahub/products/psp1_m2ggzl.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094010/garahub/products/psp2_cnlhgf.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: sonyBrand._id,
    brandName: 'Sony',
    categoryNames: ['Gaming', 'Playstation'],
    slug: 'X6-PSP-Video-Game-Console-Portable-Handheld-Game-Player-4-3',
  },
  {
    name:
      'Samsung Galaxy Note 10 Plus (Note 10+) 6.8-Inch (12GB RAM, 256GB ROM), (12MP + 16MP) Dual SIM 4,300 MAh Smartphone - Aura Black"',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, category._id],
    sku: 'sku15',
    specification:
      "Few smartphones are quite as legendary and influential as the Galaxy Note line. Over the years since the Note N7000, back in 2011, Note handsets have pushed many envelopes. Putting productivity and consumer needs first is what helped the Galaxy Notes define the phablet category and bring new life to the stylus accessory. \nEight or so years later the Galaxy Note family has an incredible weight on its shoulders and more than a few uphill battles to fight at the same time. So they've approached these challenges by delivering two distinct Note10 this year - the Galaxy Note10 and its Note10+ sibling.",
    quantity: 11,
    price: { '1-3': '700000', '4-8': '650000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094147/garahub/products/samsung1_bg4wq1.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung2_qh5rqs.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung3_cjujrn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: samsungBrand._id,
    brandName: 'Samsung',
    categoryNames: [
      'Phones',
      'Phones-Gadgets',
      'Samsung Phones',
      'Android Phones',
    ],
    slug:
      'Samsung-Galaxy-Note-10-Plus-Note-10-6-8-Inch-12GB-RAM-256GB-ROM-12MP-16MP-Dual-SIM-4-300-MAh-Smartphone-Aura-Black',
  },
  {
    name:
      'Professional Gaming Headset Stereo Led Headphones With Mic For PS4 Xbox One Phone - Black & Blue',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, headCategory._id],
    sku: 'sku15',
    specification:
      'Features: \nHigh precision 40mm driver, bring you vivid sound field, sound clarity, sound shock feeling, capable of various games. \nAmbient noise isolation. \n3.5mm connector, it is suitable for iPhone 6 / 6 Plus, Samsung S5, S4, LG, Xiaomi, iPad, PC, laptop, tablet, etc. \nEarmuffs used with skin-friendly leather material, and super soft Over-ear pads that is more comfortable for long time wear. \nGlaring LED lights are designed on the earcups, highlighting the atmosphere of the game. \nPVC wire, durable tensile effectively reduce the external resistance; cable tie, prevent the line twining.\nLine is equipped with a rotary volume controller, one key Mic mute, more convenient to use.\nExquisite craftsmanship and fashion appearance.\nProfessional gaming headset for your choice.\nSpecifications: \nModel: GM-1 \nColor: Black-red, Black-blue \nHeadphone size: Approx. 95*215*205mm/ 3 7*8.5*8.1in\nPackage content:\n1 * GM-1 Headphone',
    quantity: 20,
    price: { '1-10': '90000', '11-20': '85999' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset1_iut5gf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset2_pln1lf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset4_prtknh.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset3_ani5fn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug:
      'Professional-Gaming-Headset-Stereo-Led-Headphones-With-Mic-For-PS4-Xbox-One-Phone-Black-Blue',
  },
  {
    name: 'Apple Mac-book Pro 2017 16gb 256ssd Core I7 Quality Brand',
    description: 'Macbook Pro 2017 16gb 256ssd core i7',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      'SKU: AP044EL0U3Q08NAFAMZ\nDisplay Size (inches): 15.0\nRAM (GB): 256\nHard Disk (GB): 256\nMegapixels: 0.0\nOperating System: Mac OS X\nInternal Memory(GB): 16\nColor: N/A\nMain Material: N/A\nModel: N/A\nProduct Line: DaDiva\nWeight (kg): 2',
    quantity: 5,
    price: { '1-2': '1300000', '2-5': '1120000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac1_snusta.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094459/garahub/products/mac2_asx44i.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Laptops', 'Apple Laptops', 'Mac Books'],
    slug: 'Apple-Mac-book-Pro-2017-16gb-256ssd-Core-I7-Quality-Brand',
  },
  {
    name:
      'Infinix S5 Lite X652C-DUAL SIM-32GB ROM-3GB RAM-4G-16MP-TRIPLE AI CAMERA-4000 MAh-FINGERPRINT-VIOLET',
    description:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look.',
    categoryId: [gadgetCategory._id],
    sku: 'sku16',
    specification:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look. You probably might confuse the S5 lite for a smartphone from another brand. This goes to say Infinix went beyond the norm.\nThe beautiful design of the handset is a product of Infinix’s move to making their smartphones fit into the current trend of smartphones with classy design.',
    quantity: 23,
    price: { '1-10': '400000', '10-30': '250000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094913/garahub/products/infinix_xkd2h7.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Infinix',
    slug:
      'Infinix-S5-Lite-X652C-DUAL-SIM-32GB-ROM-3GB-RAM-4G-16MP-TRIPLE-AI-CAMERA-4000-MAh-FINGERPRINT-VIOLET',
  },
  {
    name: 'Binatone Blender And Smoothie Maker BLS-360',
    description:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home.',
    categoryId: [hkCategory._id],
    sku: 'sku16',
    specification:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home. It is a safe and healthy way of blending and grinding food in the kitchen. It is better than the old and crude way of grinding pepper in our homes. Staying healthy requires that you eat balanced meals, to help you prepare these meals conveniently; you need the right appliances. This Binatone Blender/Smoothie will make food preparing absolute fun! ',
    quantity: 9,
    price: { '1-10': '100000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender1_fmttjn.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender3_msc74f.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender2_ff4mhc.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Binatone',
    categoryNames: ['Home-Kitchen', 'Home', 'kitchen'],
    slug: 'Binatone-Blender-And-Smoothie-Maker-BLS-360',
  },
  {
    name:
      'Apple 2017 IMac 27" With Retina 5K-Intel Core I5 (7th Gen) 3.4 GHz (Quad-Core)- 8GB RAM- 1TH FUSION- AMD Radeon Pro 570 Graphics Card (4GB)- Mac OS High Sierra',
    description:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core)',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core), 27" 5120 x 2880 IPS Retina 5K Display, AMD Radeon Pro 570 Graphics Card (4GB) of VRAM, 8GB of DDR4 RAM - 1TB Fusion Drive, UHS-II SDXC Card Reader, Thunderbolt 3, USB 3.0 Type-A, 802.11ac Wi-Fi, Bluetooth 4.2, 1 x Gigabit Ethernet Port, 2 x DisplayPort via Thunderbolt Port, User-Facing: 720p Video, Magic Keyboard & Magic Mouse 2 Included, Mac OS High Sierr',
    quantity: 20,
    price: { '1-10': '8000000', '11-20': '7280000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac1_nxhssc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac2_waxxnp.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac3_ed6onr.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac4_h14mkq.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Desktops', 'Apple Desktops', 'iMac'],
    slug:
      'Apple-2017-IMac-27-With-Retina-5K-Intel-Core-I5-7th-Gen-3-4-GHz-Quad-Core-8GB-RAM-1TH-FUSION-AMD-Radeon-Pro-570-Graphics-Card-4GB-Mac-OS-High-Sierra',
  },
  {
    name:
      'Apple IPhone XS Max (4GB RAM, 64GB ROM) IOS 12 (12MP + 12MP)+7MP 4G Smartphone - Silver',
    description:
      'Brand new apple iPhone X Max affordable, silver color with ios 12 operating system',
    categoryId: [category._id, gamCategry._id],
    sku: 'sku12',
    specification:
      '6.5-inch Super Retina display (OLED) with HDR \n IP68 dust and water resistant (maximum depth of 2 meters up to 30 minutes) \n12MP dual cameras with dual OIS and 7MP TrueDepth front camera – Portrait mode, Portrait Lighting, Depth Control, and Smart HDR \nFace ID for secure authentication and Apple Pay \nA12 Bionic with next-generation Neural Engine \nWireless charging – works with Qi chargers \n iOS 12 with Memoji, Screen Time, Siri Shortcuts, and Group FaceTime',
    quantity: 73,
    price: { '1-50': '800000', '51-60': '750000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093471/garahub/products/iphonex1_irvgux.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Phones', 'Phones-Gadgets', 'Mobile Phones', 'iOS Phones'],
    slug:
      'Apple-IPhone-XS-Max-4GB-RAM-64GB-ROM-IOS-12-12MP-12MP-7MP-4G-Smartphone-Silver',
  },
  {
    name: 'Nikon D7200 DSLR Camera With 18-140mm VR Lens - Black',
    description: 'Black Nikon camera',
    categoryId: [camCategory._id],
    sku: 'sku13',
    specification:
      "Poised to deliver in the most challenging of situations, Nikon's D7200 is a versatile DX-format DSLR that caters to both still photography and video users. Featuring a 24.2MP CMOS sensor which lacks an optical low-pass filter, and an EXPEED 4 image processor, the D7200 is able to record up to 6 fps at full-resolution, or 7 fps at a 1.3x crop, with a 100-frame buffer for extended high-speed shooting. This sensor and processor combination also avails a top native sensitivity of ISO 25600, which can further be expanded to black & white-dedicated ISO 51200 and ISO 102400 sensitivities. Full HD 1080p video recording is supported up to 60 fps, and in-camera time lapse shooting with automatic exposure smoothing is possible for up to 9,999 consecutive frames. In addition to the sheer imaging benefits, the D7200 also incorporates a large 3.2\" 1,229k-dot LCD monitor, dual SD card slots, and features built-in snapbridge Wi-Fi connectivity with NFC for simple linking of your mobile device. Capable of performing in both still and video realms, the D7200 is an all-around shooter that blends sophisticated imaging technologies with refined handling and design. Rounding out its feature-set, the D7200 is also characterized by an apt 51-point AF system, with 15 cross-type points, for quick and accurate focusing in a variety of conditions. The 3D Color Matrix Metering II system, which utilizes a 2,016-pixel RGB sensor, also benefits the focusing capabilities in addition to providing precise exposure metering capabilities. Further realizing a complete imaging solution, a series of Picture Control profiles can be applied to refine the color and tonal handling of imagery. Included with the D7200 body is the wide-angle to telephoto zoom AF-S DX NIKKOR 18-140mm f/3.5-5.6G ED VR lens, which features VR image stabilization to minimize camera shake to suit working in dimly-lit conditions and with longer focal lengths. One aspherical element and one extra-low dispersion element are integrated into the lens' design to minimize aberrations and optimize image sharpness and an SWM autofocus mechanism is used to acquire focus quickly, silently, and accurately.",
    quantity: 200,
    price: { '1-100': '3000000', '100-200': '2000000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon1_wjdqhw.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon2_mjowxc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093795/garahub/products/nikon3_asa1g4.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: nikonBrand._id,
    brandName: 'Nikon',
    categoryNames: ['Camera', 'Photography', 'Nikon Cameras'],
    slug: 'Nikon-D7200-DSLR-Camera-With-18-140mm-VR-Lens-Black',
  },
  {
    name: '6 Layers Shoes Rack With A Fabric Cover',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [hkCategory._id],
    sku: 'sku14',
    specification:
      'very trendy and strong holds shoes and has a cover for dust.It beautifies your room to the modern standard and also helps to create space. It is a must have if you want the modernise way of arranging your room.',
    quantity: 15,
    price: { '1-5': '40000', '5-15': '35000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093931/garahub/products/shoerack_dkx8wg.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug: '6-Layers-Shoes-Rack-With-A-Fabric-Cover',
  },
  {
    name: 'X6 PSP Video Game Console Portable Handheld Game Player 4.3"',
    description: 'Very trendy and strong holds shoes and has a cover for dust.',
    categoryId: [gamCategry._id],
    sku: 'sku14',
    specification:
      "This is a gorgeous player console, seriously the screen is so sharp and the games look awesome and it plays like butter, but please note that the machine come with 10,000 games preloaded, but many are repeated and it's really just 100 games over and over\nEveryone selling this machine is selling the same thing, we are just being straightforward with you and letting you know the reality. The point is the game device has a very large capacity of games and the manufacturer showcases this ability by preloading with 10,000 entries, eventhough they are repreated. You can download unlimited games, and you can fill it up with 10,000 games and it would handle it easily,and downloading into the unit is made super easy via connected cable to your PC.\nEverything you need for ultimate multimedia excitement! Still looking for fast action gaming, full-featured movie watching, stereo music listening, digital photographs displaying, picture taking and video recording, this very six-in-one console does it all together plus more! With a dazzling 4.3-inch widescreen, built-in fun games come to life no matter whenever you want and wherever you are\nIts ergonomic design fits comfortably in your hands for hours of gaming and comes with all of the essentials for on the road entertainment. Enjoy storing your digital photos and sharing them with your best friends and your beloved family\n100% Top quality with basical packaging. 10000 games built-in, you can play whenever and wherever you like. 4.3-inch (480x272) full color high-speed crisp TFT widescreen. Stereo music steaming A large variety of supporting formats for music, photos and videos. Setting Function: Support setting and reading of various functions and properties. Store digital photos, music, videos, and movies and share them with your friends and family. Built-in 8GB memory\nAcoustic technology for gilding room design, high sound quality. Super lightweight design, comfortably fit for any ear. Suitable for a variety of sports.",
    quantity: 20,
    price: { '1-10': '130000', '10-15': '110000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094009/garahub/products/psp1_m2ggzl.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094010/garahub/products/psp2_cnlhgf.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: sonyBrand._id,
    brandName: 'Sony',
    categoryNames: ['Gaming', 'Playstation'],
    slug: 'X6-PSP-Video-Game-Console-Portable-Handheld-Game-Player-4-3',
  },
  {
    name:
      'Samsung Galaxy Note 10 Plus (Note 10+) 6.8-Inch (12GB RAM, 256GB ROM), (12MP + 16MP) Dual SIM 4,300 MAh Smartphone - Aura Black"',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, category._id],
    sku: 'sku15',
    specification:
      "Few smartphones are quite as legendary and influential as the Galaxy Note line. Over the years since the Note N7000, back in 2011, Note handsets have pushed many envelopes. Putting productivity and consumer needs first is what helped the Galaxy Notes define the phablet category and bring new life to the stylus accessory. \nEight or so years later the Galaxy Note family has an incredible weight on its shoulders and more than a few uphill battles to fight at the same time. So they've approached these challenges by delivering two distinct Note10 this year - the Galaxy Note10 and its Note10+ sibling.",
    quantity: 11,
    price: { '1-3': '700000', '4-8': '650000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094147/garahub/products/samsung1_bg4wq1.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung2_qh5rqs.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582094146/garahub/products/samsung3_cjujrn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: samsungBrand._id,
    brandName: 'Samsung',
    categoryNames: [
      'Phones',
      'Phones-Gadgets',
      'Samsung Phones',
      'Android Phones',
    ],
    slug:
      'Samsung-Galaxy-Note-10-Plus-Note-10-6-8-Inch-12GB-RAM-256GB-ROM-12MP-16MP-Dual-SIM-4-300-MAh-Smartphone-Aura-Black',
  },
  {
    name:
      'Professional Gaming Headset Stereo Led Headphones With Mic For PS4 Xbox One Phone - Black & Blue',
    description:
      'Few smartphones are quite as legendary and influential as the Galaxy Note line',
    categoryId: [gadgetCategory._id, headCategory._id],
    sku: 'sku15',
    specification:
      'Features: \nHigh precision 40mm driver, bring you vivid sound field, sound clarity, sound shock feeling, capable of various games. \nAmbient noise isolation. \n3.5mm connector, it is suitable for iPhone 6 / 6 Plus, Samsung S5, S4, LG, Xiaomi, iPad, PC, laptop, tablet, etc. \nEarmuffs used with skin-friendly leather material, and super soft Over-ear pads that is more comfortable for long time wear. \nGlaring LED lights are designed on the earcups, highlighting the atmosphere of the game. \nPVC wire, durable tensile effectively reduce the external resistance; cable tie, prevent the line twining.\nLine is equipped with a rotary volume controller, one key Mic mute, more convenient to use.\nExquisite craftsmanship and fashion appearance.\nProfessional gaming headset for your choice.\nSpecifications: \nModel: GM-1 \nColor: Black-red, Black-blue \nHeadphone size: Approx. 95*215*205mm/ 3 7*8.5*8.1in\nPackage content:\n1 * GM-1 Headphone',
    quantity: 20,
    price: { '1-10': '90000', '11-20': '85999' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset1_iut5gf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset2_pln1lf.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset4_prtknh.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582093280/garahub/products/headset3_ani5fn.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    slug:
      'Professional-Gaming-Headset-Stereo-Led-Headphones-With-Mic-For-PS4-Xbox-One-Phone-Black-Blue',
  },
  {
    name:
      'Infinix S5 Lite X652C-DUAL SIM-32GB ROM-3GB RAM-4G-16MP-TRIPLE AI CAMERA-4000 MAh-FINGERPRINT-VIOLET',
    description:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look.',
    categoryId: [gadgetCategory._id],
    sku: 'sku16',
    specification:
      'Without a doubt, the Infinix S5 Lite has a design that is going to have you take a second look. You probably might confuse the S5 lite for a smartphone from another brand. This goes to say Infinix went beyond the norm.\nThe beautiful design of the handset is a product of Infinix’s move to making their smartphones fit into the current trend of smartphones with classy design.',
    quantity: 23,
    price: { '1-10': '400000', '10-30': '250000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582094913/garahub/products/infinix_xkd2h7.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Infinix',
    slug:
      'Infinix-S5-Lite-X652C-DUAL-SIM-32GB-ROM-3GB-RAM-4G-16MP-TRIPLE-AI-CAMERA-4000-MAh-FINGERPRINT-VIOLET',
  },
  {
    name: 'Binatone Blender And Smoothie Maker BLS-360',
    description:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home.',
    categoryId: [hkCategory._id],
    sku: 'sku16',
    specification:
      'The Binatone BLS-360 Blender/Smoothie Maker is a must-have kitchen appliance for every home. It is a safe and healthy way of blending and grinding food in the kitchen. It is better than the old and crude way of grinding pepper in our homes. Staying healthy requires that you eat balanced meals, to help you prepare these meals conveniently; you need the right appliances. This Binatone Blender/Smoothie will make food preparing absolute fun! ',
    quantity: 9,
    price: { '1-10': '100000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender1_fmttjn.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender3_msc74f.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582096649/garahub/products/blender2_ff4mhc.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: infinixBrand._id,
    brandName: 'Binatone',
    categoryNames: ['Home-Kitchen', 'Home', 'kitchen'],
    slug: 'Binatone-Blender-And-Smoothie-Maker-BLS-360',
  },
  {
    name:
      'Apple 2017 IMac 27" With Retina 5K-Intel Core I5 (7th Gen) 3.4 GHz (Quad-Core)- 8GB RAM- 1TH FUSION- AMD Radeon Pro 570 Graphics Card (4GB)- Mac OS High Sierra',
    description:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core)',
    categoryId: [compCategory._id],
    sku: 'sku16',
    specification:
      '2017 Apple iMac 27" with Retina 5K Display (MNE92L/A)- Intel Core i5 (7th Gen) 3.4 GHz (3.8 GHz) (Quad-Core), 27" 5120 x 2880 IPS Retina 5K Display, AMD Radeon Pro 570 Graphics Card (4GB) of VRAM, 8GB of DDR4 RAM - 1TB Fusion Drive, UHS-II SDXC Card Reader, Thunderbolt 3, USB 3.0 Type-A, 802.11ac Wi-Fi, Bluetooth 4.2, 1 x Gigabit Ethernet Port, 2 x DisplayPort via Thunderbolt Port, User-Facing: 720p Video, Magic Keyboard & Magic Mouse 2 Included, Mac OS High Sierr',
    quantity: 20,
    price: { '1-10': '8000000', '11-20': '7280000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac1_nxhssc.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac2_waxxnp.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac3_ed6onr.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582098908/garahub/products/mac4_h14mkq.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: appleBrand._id,
    brandName: 'Apple',
    categoryNames: ['Computer', 'Desktops', 'Apple Desktops', 'iMac'],
    slug:
      'Apple-2017-IMac-27-With-Retina-5K-Intel-Core-I5-7th-Gen-3-4-GHz-Quad-Core-8GB-RAM-1TH-FUSION-AMD-Radeon-Pro-570-Graphics-Card-4GB-Mac-OS-High-Sierra',
  },
  {
    name: 'Hisense 50"Smart UHD 4K TV+Netflix,Youtube&DSTV Now APP-50B7100UW',
    description:
      'The ultra hd smart led tv 50b7100uw 50" TV is manufactured by Hisense and was added around October 2019. This version of the TV comes in Screen Size : 50 Inch , Display Technology : LED , Special Features : Internet Connectivity , Special Features',
    categoryId: [compCategory._id, tvCategory._id],
    sku: 'sku16',
    specification:
      'The ultra hd smart led tv 50b7100uw 50" TV is manufactured by Hisense and was added around October 2019. This version of the TV comes in Screen Size : 50 Inch , Display Technology : LED , Special Features : Internet Connectivity , Special Features : Without 3D , Special Features : Smart TV , Refresh Rate : 50 HZ , Display Resolution : Ultra HD (4K).High Dynamic RangeYou’ll be refreshed by what you see  whites look brighter, blacks look darker and colors look more vibrant.Smooth Motion Rate 100HzSmooth Motion adopts MEMC technology to enhance clarity in fast moving images. Whatever you’re watching, you’ll enjoy a fluent, smooth and clear picture on screen.Vidaa U: A simplified and 100% customizable interfaceThe proprietary interface Hisense offers a complete experience: with Vidaa U, each action is extremely simple. Adding an application, source or TV channel to its home screen becomes child’s play.Smart TVConnected, you will be able to enjoy applications on your TV, directly accessible from your remote control. Also broadcast multimedia content from your phone or computer to your screen.USB: Multimedia PlayerBroadcast your photos, music and videos on your TV via USB.HDMIWhether for your game consoles, internet box, Blu-ray player or DVD, you will not miss any more to view your favorite content.',
    quantity: 20,
    price: { '1-10': '8000000', '11-20': '7280000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582103806/garahub/products/tv_nkt17f.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582103806/garahub/products/tv2_iths0u.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: hisenseBrand._id,
    brandName: 'Hisense',
    categoryNames: ['Television Set', '4k'],
    slug: 'Hisense-50-Smart-UHD-4K-TV-Netflix-Youtube-DSTV-Now-APP-50B7100UW',
  },
  {
    name: 'Polystar 43 INCH SMART CURVED LED TV + Free Wall Bracket',
    description:
      'POLYSTAR 43 SMART CURVED TV is strong and reliable. Great graphics  to satisfy your desire for entertainments.Top features:- Vibrant Full HD display with colour enhancing technology – One Remote Control lets you control different devices – Smart View  and control your TV using your smartphone',
    categoryId: [tvCategory._id],
    sku: 'sku17',
    specification:
      'Features:  Wi-Fi \n Colour: Black\nProduct warranty: 12 Months\nWeight (kg):  8\nDisplay Features:  Full HD\nDisplay Size (inches):43',
    quantity: 2,
    price: { '1-2': '150000' },
    images: [
      'https://res.cloudinary.com/codebars/image/upload/v1582740004/garahub/products/polystar_yicxnp.jpg',
      'https://res.cloudinary.com/codebars/image/upload/v1582740004/garahub/products/polystar2_i6kb3j.jpg',
    ],
    isInStock: true,
    discountId: discount._id,
    brandId: polyStarBrand._id,
    brandName: 'Polystar',
    categoryNames: ['Television Set', '4k'],
    slug: 'Polystar-43-INCH-SMART-CURVED-LED-TV-Free-Wall-Bracket',
  },
];

export default productsData;
