function run(data) {
  let output = "";
  let indent = "";
  let is_in_person = false;
  let is_in_family = false;

  function produce(data) {
    const parts = data.split("|");
    const type = parts[0];

    if (type === "P") {
      if (is_in_family) {
        indent = indent.slice(0, -2);
        output += `${indent}</family>\n`;
        is_in_family = false;
      }
      if (is_in_person) {
        indent = indent.slice(0, -2);
        output += `${indent}</person>\n`;
        is_in_person = false;
      }

      output += `${indent}<person>\n`;
      indent += "  ";
      output += `${indent}<firstname>${parts[1]}</firstname>\n`;
      output += `${indent}<lastname>${parts[2]}</lastname>\n`;
      is_in_person = true;

    } 
    else if (type === "F") 
    {
      output += `${indent}<family>\n`;
      indent += "  ";
      output += `${indent}<name>${parts[1]}</name>\n`;
      output += `${indent}<born>${parts[2]}</born>\n`;
      is_in_family = true;

    } 
    else if (type === "T") 
    {
      output += `${indent}<phone>\n`;
      indent += "  ";
      output += `${indent}<mobile>${parts[1]}</mobile>\n`;
      output += `${indent}<landline>${parts[2]}</landline>\n`;
      indent = indent.slice(0, -2);;
      output += `${indent}</phone>\n`;

    } 
    else if (type === "A") 
    {
      output += `${indent}<address>\n`;
      indent += "  ";
      output += `${indent}<street>${parts[1]}</street>\n`;
      output += `${indent}<city>${parts[2]}</city>\n`;
      output += `${indent}<zipcode>${parts[3] || ""}</zipcode>\n`;
      indent = indent.slice(0, -2);;
      output += `${indent}</address>\n`;
    }
  }
  output += `${indent}<people>\n`;
  for (const line of data) {
    produce(line);
  }

   // stäng sista tagarna
  if (is_in_family) 
    {
    indent = indent.slice(0, -2);;
    output += `${indent}</family>\n`;
  }
  if (is_in_person) 
    {
    indent = indent.slice(0, -2);;
    output += `${indent}</person>\n`;
  }
  output += `</people>\n`;
  console.log(output);
}

const data = [
  "P|Elof|Sundin",
  "T|073-101801|018-101801",
  "A|S:t Johannesgatan 16|Uppsala|75330",
  "F|Hans|1967",
  "A|Frodegatan 13B|Uppsala|75325",
  "F|Anna|1969",
  "T|073-101802|08-101802",
  "P|Boris|Johnson",
  "A|10 Downing Street|London"
];

run(data);
