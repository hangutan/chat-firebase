import produce from "immer";
import * as types from "./actionTypes";

export interface CustomerReducer {
  inforCustomer: InfoCustomerConvertReducer;
  checkAddress: CheckAddressReducer;
  listRelationship: RelationshipReducer;
  loanProductsInfor: LoanProductsInforReducer;
  productRegisterInfo: ProductRegisterInfoReducer;
  detailProductInfo: DetailProductInfoReducer;
  billingInfo: BillingInfoReducer;
  checkOcr: CheckOcrReducer;
  logOcr: LogOCRReducer;
  insurrance: InsuranceReducer;
}

export interface InfoCustomerConvertReducer {
  gender: number;
  identityType: number;
  identityIssuePlace: string;
  identityNumber: string;
  lastName: string;
  midName: string;
  firstName: string;
  fullName: string;
  dob: string;
  identityIssueDate: string;
  jobSalary: number;
  phoneNumber: number;
  currProvinceId: number;
  currDistrictId: number;
  currWardId: number;
  currStreet: string;
  perProvinceId: number;
  perDistrictId: number;
  perWardId: number;
  perStreet: string;
}

export interface CheckAddressReducer {
  isCheck: boolean;
}

export interface CheckOcrReducer {
  comment: string;
  isHitRule: boolean;
  listApp: any[];
}

export interface LogOCRReducer {
  createdAt: string;
  id: number;
  identityNumber: string;
  identityType: string;
  imageBackPath: string;
  imageFrontPath: string;
}

export interface RelationshipReducer {
  refName: string;
  refRelationship: number | string;
  refContact: number;
  address: string;
  refName2: string;
  refContact2: number;
  refRelationship2: number | string;
  address2: string;
}

export interface LoanProductsInforReducer {
  supplierId: number | string;
  regionId: number | string;
  posId: number | string;
  schemeGroupId: number | string;
  schemeId: number | string;
}

export interface ProductRegisterInfoReducer {
  type_product: {
    value: string;
    [key: string]: any;
  };
  brand_product: {
    id: string;
    [key: string]: any;
  };
  list_product: {
    id: string;
    [key: string]: any;
  };
}

export interface DetailProductInfoReducer {
  loanAmount: number;
  color: string;
  imei: string;
  // status: string;
}

export interface BillingInfoReducer {
  downPayment: number;
  prepaidPer: number;
  tenure: number;
  dueDate: number;
  firstEmi: string;
}

export interface InsuranceReducer {
  hadUseInsurance: number;
  totalAmount: number;
  insuranceRate: number;
  insuranceId: number;
}

const initInforCustomer = {
  gender: 1,
  identityType: 1,
  identityIssuePlace: "",
  identityNumber: "",
  lastName: "",
  midName: "",
  firstName: "",
  fullName: "",
  dob: "",
  identityIssueDate: "",
  jobSalary: null,
  phoneNumber: null,
  currProvinceId: null,
  currDistrictId: null,
  currWardId: null,
  currStreet: "",
  perProvinceId: null,
  perDistrictId: null,
  perWardId: null,
  perStreet: ""
};

const initCheckAddress = {
  isCheck: false
};

const initListRelationship = {
  refName: "",
  refRelationship: "other",
  refContact: null,
  address: "",
  refName2: "",
  refContact2: null,
  refRelationship2: "other",
  address2: ""
};

const initLoanProductsInfor = {
  supplierId: null,
  regionId: null,
  posId: null,
  schemeGroupId: null,
  schemeId: null
};

const initProductRegisterInfo = {
  type_product: {
    value: ""
  },
  brand_product: {
    id: ""
  },
  list_product: {
    id: ""
  }
};

const initDetailProductInfo = {
  loanAmount: 0,
  color: "",
  imei: ""
  // status: "new",
};

const initBillingInfo = {
  downPayment: null,
  prepaidPer: null,
  tenure: null,
  dueDate: null,
  firstEmi: null
};

const initInsurrance = {
  hadUseInsurance: 0,
  totalAmount: null,
  insuranceRate: null,
  insuranceId: null
};

const initCheckOcr = {};
const initLogOcr = {};

const initial = {
  inforCustomer: initInforCustomer,
  checkAddress: initCheckAddress,
  listRelationship: initListRelationship,
  loanProductsInfor: initLoanProductsInfor,
  productRegisterInfo: initProductRegisterInfo,
  detailProductInfo: initDetailProductInfo,
  billingInfo: initBillingInfo,
  insurrance: initInsurrance,
  checkOcr: initCheckOcr,
  logOcr: initLogOcr
} as CustomerReducer;

export const customerReducer = (state = initial, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_INFORMATION_OCR:
        const info = action.info.data;
        draft.inforCustomer = {
          ...initInforCustomer,
          identityType: 1,
          identityIssuePlace: info.issue_place,
          identityNumber: info.id,
          lastName: info.first_name,
          midName: info.middle_name,
          firstName: info.first_name,
          fullName: info.name,
          dob: info.dob,
          identityIssueDate: info.issue_date,
          currProvinceId: null,
          currDistrictId: null,
          currWardId: null,
          currStreet: null,
          perProvinceId: null,
          perDistrictId: null,
          perWardId: null,
          perStreet: info.address
        };
        draft.checkOcr = action.info.check.result;
        draft.logOcr = action.info.logOCR;
        break;
      case types.UPDATE_INFORMATION:
        draft.inforCustomer = action.inforCustomer;
        break;
      case types.CHECK_ADDRESS:
        console.log("action check address:", action);
        draft.checkAddress = action.checkAddress;
        break;
      case types.UPDATE_RELATIONSHIP:
        draft.listRelationship = action.listRelationship;
        break;
      case types.UPDATE_LOAN_PRODUCTS_INFOR:
        draft.loanProductsInfor = action.loanProductsInfor;
        break;
      case types.UPDATE_PRODUCT_REGISTER_INFO:
        draft.productRegisterInfo = action.productRegisterInfo;
        break;
      case types.UPDATE_DETAIL_PRODUCT:
        draft.detailProductInfo = action.detailProductInfo;
        break;
      case types.UPDATE_BILLING_INFORMATION:
        draft.billingInfo = action.billingInfo;
        break;
      case types.UPDATE_INSURRANCE:
        draft.insurrance = action.insurrance;
        break;
      case types.CLEAR_CUSTOMER:
        draft.inforCustomer = initInforCustomer;
        draft.listRelationship = initListRelationship;
        draft.loanProductsInfor = initLoanProductsInfor;
        draft.productRegisterInfo = initProductRegisterInfo;
        draft.detailProductInfo = initDetailProductInfo;
        draft.billingInfo = initBillingInfo;
        draft.insurrance = initInsurrance;
        draft.checkAddress = initCheckAddress;
        // draft.checkOcr = initCheckOcr,
        // draft.logOcr = initLogOcr,
        break;
      default:
        return draft;
    }
  });
