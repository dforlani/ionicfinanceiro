import { RouteComponentProps } from "react-router";
import { Lancamento } from "../models/Lancamento";

interface Props extends RouteComponentProps <{}>{
    doClose: Function;
    lancamento_key: string;
  }
  export default Props;