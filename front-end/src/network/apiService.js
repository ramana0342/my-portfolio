import axiosInstance from "./axiosInstance";
import getBaseURL from "./ApiConfig";


// ========================================
// GET REQUEST
// ========================================

export const getRequest = (
  url,
  { params = {}, config = {} } = {}
) => {

  return axiosInstance.get(url, {
    params,
    ...config,
  });
};


// ========================================
// POST REQUEST
// ========================================

export const postRequest = (
  url,
  { data = {}, config = {} } = {}
) => {

  return axiosInstance.post(
    url,
    data,
    config
  );
};


// ========================================
// PUT REQUEST
// ========================================

export const putRequest = (
  url,
  { data = {}, config = {} } = {}
) => {

  return axiosInstance.put(
    url,
    data,
    config
  );
};


// ========================================
// DELETE REQUEST
// ========================================

export const deleteRequest = (
  url,
  { data = {}, config = {} } = {}
) => {

  return axiosInstance.delete(url, {
    data,
    ...config,
  });
};


export const patchRequest = (
    url,
    { data = {}, config = {} } = {}
) => {

    return axiosInstance.patch(
        url,
        data,
        config
    );
};


// ========================================
// AI STREAM REQUEST
// ========================================

export const aiStreamRequest = async (
  url,
  {
    data = {},
    onChunk,
    onComplete,
    onError
  } = {}
) => {

  try {

    const response = await fetch(
      `${getBaseURL()}${url}`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        credentials: "include",

        body: JSON.stringify(data),
      }
    );


    // ========================================
    // HTTP ERROR
    // ========================================

    if (!response.ok) {

      let errorData = null;

      try {

        errorData =
          await response.json();

      } catch {
        // Ignore response parsing error
      }


      const error =
        new Error(
          errorData?.message ||
          "AI request failed"
        );


      error.response = {
        status:
          response.status,

        data:
          errorData,
      };


      throw error;
    }


    // ========================================
    // STREAM NOT SUPPORTED
    // ========================================

    if (!response.body) {

      throw new Error(
        "Streaming is not supported by this browser."
      );
    }


    const reader =
      response.body.getReader();


    const decoder =
      new TextDecoder("utf-8");


    let buffer = "";


    // ========================================
    // READ STREAM
    // ========================================

    while (true) {

      const {
        value,
        done
      } = await reader.read();


      if (done) {
        break;
      }


      buffer += decoder.decode(
        value,
        {
          stream: true
        }
      );


      /*
       * SSE events are separated
       * by an empty line.
       */
      const events =
        buffer.split(
          /\r?\n\r?\n/
        );


      /*
       * Keep incomplete event
       * for the next chunk.
       */
      buffer =
        events.pop() || "";


      // ========================================
      // PROCESS EVENTS
      // ========================================

      for (
        const event of events
      ) {

        const lines =
          event.split(
            /\r?\n/
          );


        const dataLine =
          lines.find(
            (line) =>
              line.startsWith(
                "data:"
              )
          );


        if (!dataLine) {
          continue;
        }


        const json =
          dataLine
            .slice(5)
            .trim();


        if (!json) {
          continue;
        }


        let parsed;


        try {

          parsed =
            JSON.parse(json);

        } catch (error) {

          console.error(
            "SSE JSON Parse Error:",
            json
          );

          continue;
        }


        // ========================================
        // CONNECTED
        // ========================================

        if (
          parsed.type ===
          "connected"
        ) {

          console.log(
            "AI stream connected"
          );

          continue;
        }


        // ========================================
        // AI CHUNK
        // ========================================

        if (
          parsed.type ===
          "chunk"
        ) {

          onChunk?.(
            parsed.text
          );
        }


        // ========================================
        // COMPLETED
        // ========================================

        if (
          parsed.type ===
          "done"
        ) {

          console.log(
            "AI stream completed"
          );

          onComplete?.();
        }


        // ========================================
        // SERVER ERROR
        // ========================================

        if (
          parsed.type ===
          "error"
        ) {

          throw new Error(
            parsed.message
          );
        }
      }
    }


    // ========================================
    // PROCESS REMAINING BUFFER
    // ========================================

    if (buffer.trim()) {

      const dataLine =
        buffer
          .split(/\r?\n/)
          .find(
            (line) =>
              line.startsWith(
                "data:"
              )
          );


      if (dataLine) {

        const json =
          dataLine
            .slice(5)
            .trim();


        if (json) {

          const parsed =
            JSON.parse(json);


          if (
            parsed.type ===
            "chunk"
          ) {

            onChunk?.(
              parsed.text
            );
          }


          if (
            parsed.type ===
            "done"
          ) {

            onComplete?.();
          }
        }
      }
    }

  } catch (error) {

    console.error(
      "AI Stream Error:",
      error
    );

    onError?.(error);
  }
};