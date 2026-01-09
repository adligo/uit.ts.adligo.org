/**
 * Templates are intended for client or server usage, with 
 * respective attendants attached.
 * 
 * 
 */
/**
 * the main User Interface Template after it's parsed
 */
export interface  I_UIT {
    /** Inline javascript, set to the head */
    getJs(): string
    /**
     * The name of the component, panel or view
     */
    getName(): string;
    getHtmlTemplate(): string;

    hasJs(): boolean;
}

/**
 * A registry for templates
 */
export interface I_Registry {
  get(name: string): I_UIT;
  has(name: string): boolean;
}

/**
 * 
 */
export class Registry implements I_Registry {
  uits: Map<string, I_UIT> = new Map();

  constructor(uits: Map<string, I_UIT>) {
     this.uits = new Map(uits);
  }

  get(name: string): I_UIT {
    return this.uits.get(name); 
  }

  has(name: string): boolean {
    return this.uits.has(name); 
  }
}


/**
 * 
 */
export class RegistryBuilder {
  uits: Map<string, I_UIT> = new Map();

  constructor(uits: Map<string, I_UIT> | null = new Map()) {
    this.uits = uits;
  }

  add(uit: I_UIT): RegistryBuilder {
    if (this.uits.has(uit.getName())) {
        throw new Error("Duplicate template name: " + uit.getName());
    }
    this.uits.set(uit.getName(), uit);
    return this;    
  }

  build(): Registry {
    return new Registry(this.uits);
  }
}

export class UITMutant implements I_UIT {
  name: string;
  htmlTemplate: string;
  js: string;

  constructor(name: string, htmlTemplate: string, js: string | null = null) {
    this.name = name;
    this.htmlTemplate = htmlTemplate;
    this.js = js;
  }

  hasJs(): boolean {
    return this.js !== null;
  }

  getJs(): string {
    return this.js;
  }

  getName(): string {
    return this.name;
  }
  getHtmlTemplate(): string {
    return this.htmlTemplate;
  }
}

export class UITShield implements I_UIT {
  mutant: UITMutant;

  constructor(other: UITMutant) {
    if (isMissing(other)) {
      throw new Error("Other is required!");
    }
    this.mutant = other;
  }

  hasJs(): boolean {
    return this.mutant.hasJs();
  }

  getJs(): string {
    return this.mutant.getJs();
  }

  getName(): string {
    return this.mutant.getName();
  }
  getHtmlTemplate(): string {
    return this.mutant.getHtmlTemplate();
  }
}

export function isMissing(o: any) : boolean {
    if (o === null || o === undefined) {
        return true;
    }
    if (typeof(o) === "string" && o.trim() === "") {
        return true;
    }
    return false;
}

export class UITBuilder {
  public static readonly of = (name: string, html: string, js: string | null = null) => {
    return new UITBuilder(name, html, js);
  }
  html: string;
  name: string;
  js: string;

  constructor(name: string, htmlTemplate: string, js: string | null = null) {
    validateName(name);
    this.name = name;

    validateHtmlTemplate(htmlTemplate);
    this.html = htmlTemplate;
    this.js = js;
  }

  build() : I_UIT {
    return new UITShield(new UITMutant(this.name, this.html, this.js));
  }

  getJs() {
    return this.js;
  }


  getName() {
    return this.name;
  }

  hasJs() {
    return this.js !== null;
  }

  getHtmlTemplate() {
    return this.html;
  }
}

/**
 * A simple sanity check to see if there is some code,
 * not a full parse! 
 * @param code 
 */
function validateHtmlTemplate(htmlTemplate: string) {
    if (isMissing(htmlTemplate)) {
        throw new Error("HtmlTemplate is required!");
    }
}

function isCharWhitespace(char: string): boolean {
  return char.length > 0 && char.trim().length === 0;
}

export function validateName(name: string) {
    if (isMissing(name)) {
        throw new Error("A name is required!");
    }
    if (name.charAt(0).toUpperCase() !== name.charAt(0)) {
        throw new Error("Name must start with an uppercase letter!");
    }
    for (let index = 0; index < name.length; index++) {
      let c = name.charAt(index);
      if (isCharWhitespace(c)) {
        throw new Error("Name MUST NOT contain whitespace!");
      }
    }
}
