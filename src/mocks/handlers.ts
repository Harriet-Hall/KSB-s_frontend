import { http, HttpResponse } from "msw";
import type { Ksb, KsbRequestData } from "../../types";
const crypto = require('crypto');

let initialKsbs = [
  {
    id: "d9385487-94de-484b-8f0c-079d365815f9",
    type: "Knowledge",
    code: 2,
    description: "knowledge description",
    updated_at: "Wed, 12 Mar 2025 12:45:39 GMT",
    theme: "code quality",
  },
  {
    id: "d9385487-94de-484b-8f0c-079d365815f8",
    type: "Skill",
    code: 3,
    description: "skill description",
    updated_at: "Wed, 13 Mar 2025 12:45:39 GMT",
    theme: "operability",
  },
  {
    id: "d9385487-94de-484b-8f0c-079d365815f7",
    type: "Behaviour",
    code: 2,
    description: "behaviour description",
    updated_at: "Wed, 14 Mar 2025 12:45:39 GMT",
    theme: "code quality",
  },
];

let ksbs = [...initialKsbs]

export const handlers = [
  http.get("http://35.176.157.141:5000/ksbs", ({ request }) => {
    return HttpResponse.json(ksbs);
  }),

  http.delete("http://35.176.157.141:5000/ksbs/:id", ({ params }) => {
    ksbs = ksbs.filter((ksb) => ksb.id != params.id);
    return HttpResponse.json({}, { status: 204 });
  }),

  http.post("http://35.176.157.141:5000/ksbs/:type", async ({ request, params }) => {

    const request_data = (await request.json()) as KsbRequestData;

    const { code, description, theme } = request_data;

    const new_ksb: Ksb = {
      id: crypto.randomUUID(),
      type: params.type,
      code: code,
      description: description,
      updated_at:  new Date().toUTCString(),
      theme: theme,
    };
    ksbs.push(new_ksb);
    return HttpResponse.json(new_ksb, { status: 201 });
  }),
  // http.put("http://35.176.157.141:5000/:id", async ({ request, params }) => {
  //   const request_data = (await request.json())
  //   const { type } = request_data;

  //   ksbs[1].type = type
  //   console.log(ksbs)

  //   return HttpResponse.json({ status: 200 });

 
  // })
];


export {ksbs, initialKsbs}