import { StackBasicProps } from "../interfaces";

export function getCdkPropsFromCustomProps(props:StackBasicProps){
  return {
      stackName: props.name,
      env:{
        account:props.account,
        region:props.region
      },
    };
}


export function getDefaultResourceName(props:StackBasicProps,name:string){
  return `${props.name}-${name}`;
}
