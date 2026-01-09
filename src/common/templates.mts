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
    /**
     * The name of the component, panel or view
     */
    getName(): string;
    getHtml(): string
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
  html: string;

  constructor(name: string, html: string) {
    this.name = name;
    this.html = html;
  }

  getName(): string {
    return this.name;
  }
  getHtml(): string {
    return this.html;
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

  getName(): string {
    return this.mutant.getName();
  }
  getHtml(): string {
    return this.mutant.getHtml();
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
  public static readonly of = (name: string, code: string) => {
    return new UITBuilder(name, code);
  }
  code: string;
  name: string;

  constructor(name: string, code: string) {
    validateName(name);
    this.name = name;

    validateCode(code);
    this.code = code;
  }

  build() : I_UIT {
    return new UITShield(new UITMutant(this.name, this.code));
  }

  getName() {
    return this.name;
  }

  toHtml() {
    return this.code;
  }
}

/**
 * A simple sanity check to see if there is some code,
 * not a full parse! 
 * @param code 
 */
function validateCode(code: string) {
    if (isMissing(code)) {
        throw new Error("Code is required!");
    }
}

function validateName(name: string) {
    if (isMissing(name)) {
        throw new Error("A name is required!");
    }
    if (name.charAt(0).toUpperCase() !== name.charAt(0)) {
        throw new Error("Name must start with an uppercase letter!");
    }
}
