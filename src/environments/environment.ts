// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe:{
    publishableKey: 'pk_test_51QJ0RlF5yxkLL8z9meIVjdqFZ5deqRAfyqlY71fA3s2cWW8F2M74aDFiik4HAvuoA7ucgjhilMbPw9OqStYMD67q00ePLjKlCk',
    secretKey: 'sk_test_51QJ0RlF5yxkLL8z90CXC9yjWhL81y5MLWeI0ciqaHzo0mmueI2VHyVQxgMbBvdf7nWyRX6s5YoJRpZKlRP1JxSa700E5bzkuzF'
  },
  api:'https://quickdinehub-back1.onrender.com/' 
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
