export interface jobsTypeInt {
  jobName: string;
  payMin: string;
  payMax: string;
  payMonth: string;
  welfare: string;
  education: string;
  workingYears: string;
  cityId: string;
  areaId: string;
  companyId: number;
  id: number;
  publishTime: number;
  workPosition: string;
  companyName: string;
}

export interface selectInt {
  WorkingYears: string[];
  Welfares: string[];
  PayMonths: string[];
  PayFilter: string[];
}

export interface selectKeyOptionInt {
  key: string;
  name: string;
  inp: string;
}

interface selectTypeInt {
  jobName: string;
  payArea: string;
  cityId: number;
  education: string;
}
// export interface selectTypeInt {
//   jobName: string;
//   payArea: string;
//   payMonth: string;
//   workingYear: string;
//   [key: string]: any;
// }
export interface optionTypeInt {
  //   [propNmae: string]: string[];
  WorkingYears: string[];
  Welfares: string[];
  PayMonths: string[];
  PayFilter: string[];
}

export class InitData {
  jobs: Array<jobsTypeInt> = [];
  select: selectTypeInt = {
    jobName: "",
    payArea: "",
    cityId: 0,
    education: "",
  };
  options: optionTypeInt = {
    WorkingYears: [],
    Welfares: [],
    PayMonths: [],
    PayFilter: [],
  };
}

// export class InitData {
//   jobs: Array<jobsTypeInt> = [];
//   select: selectTypeInt = {
//     jobName: "",
//     payArea: "",
//     payMonth: "",
//     workingYear: "",
//   };
//   options: optionTypeInt = {
//     WorkingYears: [],
//     Welfares: [],
//     PayMonths: [],
//     PayFilter: [],
//   };
// }
