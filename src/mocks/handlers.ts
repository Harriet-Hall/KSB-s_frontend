import { http, HttpResponse } from "msw";
import type { Ksb, KsbPostRequestData, KsbUpdateRequestData } from "../../types";
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
    updated_at: "Thu, 13 Mar 2025 12:45:39 GMT",
    theme: "operability",
  },
  {
    id: "d9385487-94de-484b-8f0c-079d365815f7",
    type: "Behaviour",
    code: 2,
    description: "behaviour description",
    updated_at: "Fri, 14 Mar 2025 12:45:39 GMT",
    theme: "code quality",
  },
];

let ksbs = [...initialKsbs]

export const handlers = [
  http.get("https://m7sq42zktc.execute-api.eu-west-2.amazonaws.com/prod/ksbs", ({ request }) => {
    return HttpResponse.json(ksbs);
  }),

  http.delete("https://m7sq42zktc.execute-api.eu-west-2.amazonaws.com/prod/ksbs/:id", ({ params }) => {
    ksbs = ksbs.filter((ksb) => ksb.id != params.id);
    return HttpResponse.json({}, { status: 204 });
  }),

  http.post("https://m7sq42zktc.execute-api.eu-west-2.amazonaws.com/prod/ksbs/:type", async ({ request, params }) => {

    const request_data = (await request.json()) as KsbPostRequestData;

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
    return HttpResponse.json(ksbs, { status: 201 });
  }),
  http.put("https://m7sq42zktc.execute-api.eu-west-2.amazonaws.com/prod/ksbs/:id", async ({ request, params }) => {

  const request_data = await request.json();
  const { type, code, description } = request_data as KsbUpdateRequestData

  for (let i in ksbs) {
    if (ksbs[i].id === params.id) {
      ksbs[i].type = type;
      ksbs[i].code = code;
      ksbs[i].description = description;
      return HttpResponse.json(ksbs[i], { status: 200 }); 
    }
  }
  })
];

export {ksbs, initialKsbs}