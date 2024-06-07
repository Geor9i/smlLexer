const VARIABLE_DECLARATION = {
  type: "VARIABLE_DECLARATION",
  content: [
    ["VAR", "LET", "CONST"],
    {
      content: ["word", "COMMA"],
      terminator: 'word',
      repeat: true
    },
    "ASSIGNMENT",
    "VALUE",
  ],
};

export const context = {
  VARIABLE_DECLARATION,
};
