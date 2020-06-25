import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const NumberPanel = () => {
  const assignNumber = async () => {
    const config = {
      headers: {
        "Authorization": `Token token=6c0dbe4e525e0bff243007882b40eb2b`,
        "Content-Type": "application/json",
      },
    };

    const data = {
      "name": "email",
      "company_id": "TRKdf8fad82ad7f417aace644032fd33126",
      "type": "source",
      "call_flow": {
        "type": "advanced",
        "recording_enabled": "true",
        "initial_step_id": "CRSc4a6f736bd314437a1a376efe4c168d6",
        "steps": [
          {
            "destination_numbers": ["+1321-234-3769", "+1818-839-5992"],
            "id": "417878101",
            "last_destination": "null",
            "screening": "null",
            "timeout": "20",
            "timeout_step_id": "404261984",
            "type": "simulcall",
          },
          {
            "destination_numbers": ["+1213-271-9548", "+1321-234-3769"],
            "id": "928853044",
            "last_destination": "null",
            "screening": "null",
            "timeout": "5",
            "timeout_step_id": "417878101",
            "type": "simulcall",
          },
          {
            "id": "203988285",
            "match_step_id": "null",
            "no_match_step_id": "964995588",
            "schedule_sets": [
              {
                "next_step_id": "928853044",
                "times": [
                  {
                    "day": "weekdays",
                    "start_time": "0500",
                    "end_time": "1800",
                  },
                  {
                    "day": "saturday",
                    "start_time": "0600",
                    "end_time": "1400",
                  },
                ],
              },
            ],
          },
          {
            "destination_numbers": [
              "+1321-234-3769",
              "+1213-271-9548",
              "+1818-839-5992",
            ],
            "id": "404261984",
            "last_destination": "null",
            "screening": "null",
            "timeout": "60",
            "timeout_step_id": "629096237",
            "type": "simulcall",
          },
          {
            "id": "964995588",
            "locale_key": "null",
            "prompt_recording_id": "89096",
            "prompt_text": "Thank you for your call. Please leave a message.",
            "prompt_type": "recording",
            "transcribe": "false",
            "type": "voicemail",
          },
          {
            "id": "629096237",
            "locale_key": "en-US",
            "prompt_recording_id": "89097",
            "prompt_text": "Thank you for your call. Please leave a message.",
            "prompt_type": "recording",
            "transcribe": "false",
            "type": "voicemail",
          },
        ],
      },
      "source": { "type": "web_referrer", "referrer": "offline" },
      "tracking_number": { "area_code": "213", "local": "+12132719548" },
    };

    const res = await axios.post(
      `https://api.callrail.com/v3/a/423787543/trackers.json?`,
      data,
      config
    );

    console.log(res.data);
  };

  const onClick = (e) => {
    assignNumber();
  };
  return (
    <div>
      <button onClick={onClick}>Stongle</button>

      <p></p>
    </div>
  );
};

export default NumberPanel;
