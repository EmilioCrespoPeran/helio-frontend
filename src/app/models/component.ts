export class ComponentModel {

  private _id: string;
  private _name: string;
  private _source: string;
  private _clazz: string;
  private _type: string;

  constructor({ id, source, clazz, type }) {
    this._id = id;
    this._source = source;
    this._clazz = clazz;
    this._type = type;
    // Extract repository name by regex
    //this._name = source.match('^.*\\/helio-ecosystem\\/([^\\/]*).*$')[1];
    try {
      //this._name = source.match('([a-zA-Z|\-]+)-.*$')[1].replaceAll('-', ' ');
      this._name = this._clazz.split('.').reverse()[0];
    }
    catch (e) {
      this._name = this._clazz;
    }
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get source(): string {
    return this._source;
  }

  set source(value: string) {
    this._source = value;
  }

  get clazz(): string {
    return this._clazz;
  }

  set clazz(value: string) {
    this._clazz = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  toJson() {
    return { source: this.source, clazz: this.clazz, type: this.type };
  }

}
