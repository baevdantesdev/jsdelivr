export interface AppState {
  packages: PackageList | null;
}

export interface PackageList {
  objects: Package[];
  total: number;
  time: Date;
}

export interface Package {
  'package': {
    'name': string;
    'version': string;
    'description': string;
    'keywords': string[];
    'date': Date;
    'links': {
      'npm': string;
      'homepage': string;
      'repository': string;
      'bugs': string;
    };
    'publisher': {
      'username': string;
      'email': string;
    };
    author: {
      name: string;
      url: string;
    };
    'maintainers': Maintainer[];
  };
  'score': {
    'final': number;
    'detail': {
      'quality': number;
      'popularity': number;
      'maintenance': number;
    };
  };
  'searchScore': number;
}

export interface Maintainer {
  'username': string;
  'email': string;
}

export interface PackageTableRow {
  name: string;
  author: string;
  publisher: string;
  version: string;
}
