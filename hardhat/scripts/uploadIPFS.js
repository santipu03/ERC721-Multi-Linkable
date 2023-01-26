async function run() {
  const { create } = await import("ipfs-http-client");
  const ipfs = await create();

  // we added three attributes, add as many as you want!
  const metadata = {
    path: "/",
    content: JSON.stringify({
      name: "TOKEN1",
      attributes: [
        {
          trait_type: "Chill",
          value: "100",
        },
        {
          trait_type: "Nature",
          value: "120",
        },
        {
          trait_type: "Web3",
          value: "1000",
        },
      ],
      // update the IPFS CID to be your image CID
      image:
        "https://ipfs.io/ipfs/QmP2NPVRhb5jas7Cac4UUP8PAQWESAMuQGFDfYWLGM1eQC?filename=man_grass.jpg",
      description: "Chilling man in the grass",
    }),
  };

  const result = await ipfs.add(metadata);
  console.log(result);

  process.exit(0);
}

run();
