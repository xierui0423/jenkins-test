module.exports = function config(env) {
  // Use this array to control which entries will be compiled
  // (leave it empty to compile all entries);
  const compilePages = [
    // 'signin',
    // 'top-doctors',
  ];

  // TODO Pass the compilation pages as a cmd parameter

  // eslint-disable-next-line
  return require(`./webpack.${env}.js`)(env, compilePages);
};
