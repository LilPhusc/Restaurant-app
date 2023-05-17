export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  
    {
      name:"short_description",
      type:"string",
      title:"Short-decription",
      validation: (Rule) =>Rule.max(200),
    },
    {
      name:"image",
      type:"image",
      title:"Image of Restaurant",
    },
    {
      name:"lat",
      type:"number",
      title:"Lattitude of the restaurant",
    },
    {
      name:"long",
      type:"string",
      title:"Longitude of the restaurant",
    },
    {
      name:"address",
      type:"string",
      title:"Restaurant address",
      validation: (Rule) => Rule.required(),
    },
    {
      name:"rating",
      type:"number",
      title:"Enter a Rating from (1-5 Stars)",
      validation: (Rule) =>
      Rule.min(1).max(5).required().error("Please enter a value between 1 and 5"),
    },
    {
      name:"type",
      title:"Category",
      validation: (Rule) => Rule.required(),
      type:"reference",
      to: [{type: "category"}],
    },
    {
      name:"dishes",
      type:"array",
      title:"Dishes",
      of:[{type: "reference", to:[{type:"dish"}]}],
    },

  ],
}
