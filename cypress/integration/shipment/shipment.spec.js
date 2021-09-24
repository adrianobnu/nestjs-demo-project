let host = `http://localhost:3000/shipment`;

describe('shipment API', () => {
  it('verify request returns JSON', () => {
    cy.request(host)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('verify the request returns the correct status code', () => {
    cy.request(host).its('status').should('be.equal', 200);
  });

  it('verify if the request body is invalid', () => {
    cy.request({
        url: host,
        failOnStatusCode: false,
        method: 'POST'
    }).its('status').should('be.equal', 400);    
  });

  it('verify if the request body valid', () => {
    cy.request('POST',host,{
        "user_uuid": "243944f3-b987-4939-8f3d-4d0d03d8528f",
        "email": "user_email@hotmail.com",
        "quote": {
            "origin": {
                "country": "US",
                "state": "VA",
                "city": "Leesburg",
                "postal_code": "20175",
                "address": "Shenandoah Street Southeast 234, VA - US",
                "street": "Shenandoah Street Southeast",
                "street_number": "234",
                "is_residencial_address": true,
                "complement_address": null
            },
            "destination": {
                "country": "US",
                "state": "VA",
                "city": "Herndon",
                "postal_code": "20171",
                "address": "Dulles Station Boulevard 2341, VA - US",
                "street": "Dulles Station Boulevard",
                "street_number": "2341",
                "is_residencial_address": true,
                "complement_address": null
            },
            "ship_date": "2021-07-22T03:00:00.000Z",
            "packages": [
                {
                    "weight": 2.30,
                    "width": 3,
                    "height": 1,
                    "length": 0.4,
                    "quantity": 3,
                    "items": [
                        {
                            "commodity": {
                                "value": {
                                    "description": "Other",
                                    "hts_no": "6101.30.20"
                                }
                            },
                            "unit_price": "$",
                            "quantity": 1
                        }
                    ],
                    "contains": {
                        "perfume": false,
                        "battery": false
                    }
                },
                {
                    "weight": 0.50,
                    "width": 2,
                    "height": 1,
                    "length": 2,
                    "quantity": 1,
                    "items": [
                        {
                            "commodity": {
                                "value": {
                                    "description": "Other",
                                    "hts_no": "6101.30.20"
                                }
                            },
                            "unit_price": "$",
                            "quantity": 1
                        }
                    ],
                    "contains": {
                        "perfume": false,
                        "battery": false
                    }
                }
            ],
            "packages_meta": {
                "type": "box",
                "package_quantity": 2,
                "weight_total": 7.3999999999999995,
                "weight_unit": "LBS",
                "measure_unit": "IN",
                "cargo_value": 0,
                "currency": {
                    "code": "USD",
                    "symbol": "$"
                },
                "has_perfume": false,
                "has_battery": false
            }
        },
        "parcel_rate_source": "carrier company",
        "recipient": {
            "full_name": "recipient name",
            "tax_id": "5543454",
            "category": "company",
            "address": {
                "country": "US",
                "state": "VA",
                "city": "Herndon",
                "postal_code": "20171",
                "address": "Dulles Station Boulevard 2341, VA - US",
                "street": "Dulles Station Boulevard",
                "street_number": "2341",
                "is_residencial_address": true,
                "complement_address": null
            },
            "email": "another@email.com",
            "phone": {
                "prefix": "+1",
                "number": "32453455345"
            }
        },
        "sender": {
            "full_name": "sender name",
            "category": "individual",
            "tax_id": "243234234234",
            "address": {
                "country": "US",
                "state": "VA",
                "city": "Leesburg",
                "postal_code": "20175",
                "address": "Shenandoah Street Southeast 234, VA - US",
                "street": "Shenandoah Street Southeast",
                "street_number": "234",
                "is_residencial_address": true,
                "complement_address": null
            },
            "email": "sample@email.com",
            "phone": {
                "prefix": "+1",
                "number": "444423344234"
            }
        },
        "estimated_date": "2021-07-23T02:00:00.000Z"
    }).its('status').should('be.equal', 201);    
  });
});
