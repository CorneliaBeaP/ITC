import {Colour} from "./colour";
import {MainCategory} from "./main-category";
import {UnderCategory} from "./under-category";
import {Theme} from "./theme";

export class Garment {
  id: number;
  colours: Colour[];
  mainCategory: MainCategory;
  underCategories: UnderCategory[];
  themes: Theme[];
}
