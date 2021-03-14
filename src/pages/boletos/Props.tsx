import { RouteComponentProps } from "react-router";
import { Boleto } from "../models/Boleto";

interface Props extends RouteComponentProps <{}>{
    doClose: Function;
    boleto_key: string;
  }
  export default Props;