const MAX_LENGTH_PW = 6;
const SORT = "createdAt";
const DIRECTION = "desc";
const LIMIT = 25;
const SKIP = 0;

const RELATIONSHIP = [
  {
    id: 'other',
    name: 'Khác'
  }, 
  {
    id: 'spouse',
    name: 'Vợ chồng'
  }, 
  {
    id: 'parent',
    name: 'Cha mẹ'
  }, 
  {
    id: 'children',
    name: 'Con cái',
  }, 
  {
    id: 'sibling',
    name: 'Anh chị em ruột'
  }, 
  {
    id: 'grand-parent',
    name: 'Ông bà',
  }, 
  {
    id: 'cousin',
    name: 'Anh chị em họ',
  }, 
  {
    id: 'relative',
    name: 'Cô/dì/chú/bác',
  }, 
  {
    id: 'lover',
    name: 'Người yêu',
  }, 
  {
    id: 'neighborhood',
    name: 'Hàng xóm'
  }, 
  {
    id: 'friend',
    name: 'Bạn bè'
  }, 
  {
    id: 'colleague',
    name: 'Đồng nghiệp'
  }, 
];

const LIST_STORE = [
  {
    id: '1',
    name: 'Táo đẹp, khu vực phước Mỹ, Đồng Nai'
  },
  {
    id: '2',
    name: 'Táo xinh, Cam Lâm, Khánh Hoà'
  }
];

const LIST_GROUP_LOAN_PRODUCT = [
  {
    id: 'cld',
    name: 'CLD',
  },
  {
    id: 'clgt',
    name: 'CLGT',
  }
];

const INTEREST_RATE_BRACKET = [
  {
    id: '1',
    name: 'CLD standard',
  },
]

const TYPE_PRODUCT = [
  {
    id: 'product1',
    name: 'Product 1'
  },
  {
    id: 'product2',
    name: 'Product 2',
  }
];

export { MAX_LENGTH_PW, SORT, DIRECTION, LIMIT, SKIP, RELATIONSHIP, LIST_STORE, LIST_GROUP_LOAN_PRODUCT, INTEREST_RATE_BRACKET, TYPE_PRODUCT };
