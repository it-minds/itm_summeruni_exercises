import { render } from "solid-js/web";
import {
  BasicState1,
  BasicState2,
  BasicState3,
  BasicState4,
  BasicState5,
} from "./01-basic-state";
import {
  BasicEffect1,
  BasicEffect2,
  BasicEffect3,
  BasicEffect4,
  BasicEffect5,
} from "./02-basic-effect";
import {
  AdvanceState1,
  AdvanceState2,
  AdvanceState3,
  AdvanceState4,
  AdvanceState5,
  AdvanceState6,
} from "./03-advanced-state";
import {
  AdvancedEffect1,
  AdvancedEffect2,
  AdvancedEffect3,
  AdvancedEffect4,
  AdvancedEffect5,
  AdvancedEffect6,
} from "./04-advanced-effect";

// With Typescript strict the current `render` function will complain a bit about the default return type of `getElementById`
// as it is possible to return null in which case `render` throws an error;
//@ts-ignore
render(() => <BasicState1 />, document.getElementById("app"));
