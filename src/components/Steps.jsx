import React from "react";

const STEPS = [
  {
    title: "Order Intake",
    text: `Receive buyer PO, upload tech pack & size specs. Create order in FabriTrack, assign order ID and deadlines.`,
    video: "https://www.youtube.com/embed/VIDEO_ID_1",
  },
  {
    title: "Tech Pack & Planning",
    text: `Upload tech pack, create production plan and break order into batches with timings for each stage.`,
    video: "https://www.youtube.com/embed/VIDEO_ID_2",
  },
  {
    title: "Material Procurement & Inventory",
    text: `Check inventory, create procurement for shortages, receive and scan materials into stock reserved for the order.`,
    video: "https://www.youtube.com/embed/VIDEO_ID_3",
  },
  {
    title: "Cutting",
    text: `Generate marker/cutting lists, log cutting output and material used. System updates inventory and yield reports.`,
    video: "https://www.youtube.com/embed/VIDEO_ID_4",
  },
  {
    title: "Sewing (Assembly)",
    text: `Move bundles to sewing lines, log progress per bundle, track WIP and operator performance, flag defects.`,
    video: "https://www.youtube.com/embed/VIDEO_ID_5",
  },
  {
    title: "Quality Control",
    text: `In-line and final QC checks recorded with pass/fail and reasons; failed items are routed for rework.`,
    video: "https://www.youtube.com/embed/VIDEO_ID_6",
  },
  {
    title: "Finishing & Packing",
    text: `Trim, press and pack garments; print packing lists and labels; record cartons and quantities.`,
    video: "https://www.youtube.com/embed/VIDEO_ID_7",
  },
  {
    title: "Dispatch & Reporting",
    text: `Create shipment, mark dispatched, update order status; review OEE, yield, delivery performance.`,
    video: "https://www.youtube.com/embed/VIDEO_ID_8",
  },
];

const StepCard = ({ step, index }) => {
  const isOdd = index % 2 === 0; // 0 -> odd visually (1st step): video left, text right
  const containerBg = "bg-[#FFF5E6] dark:bg-[#403530]";
  const cardBorder = "border border-[#D9BFA7] dark:border-[#5f4631]";
  const titleColor = "text-[#5f4631] dark:text-[#f4ead8]";
  const textColor = "text-[#6e5443] dark:text-[#e9dccb]";

  return (
    <section className={`w-full py-8 ${containerBg}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
            isOdd ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Video */}
          <div className="w-full md:w-1/2">
            {/* Responsive video embed — aspect ratio box */}
            <div className={`w-full rounded-md overflow-hidden ${cardBorder}`}>
              {/* Use iframe for youtube or <video> for local file */}
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={step.video}
                  title={step.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <div
              className={`p-6 rounded-md ${cardBorder} bg-white/60 dark:bg-black/30`}
            >
              <h3
                className={`text-xl font-semibold mb-3 ${titleColor}`}
              >{`Step ${index + 1}: ${step.title}`}</h3>
              <p className={`leading-relaxed ${textColor}`}>{step.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Steps = () => {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4 text-[#5f4631] dark:text-[#f4ead8]">
          How FabriTrack Works
        </h2>
        <p className="mb-8 text-[#6e5443] dark:text-[#e9dccb]">
          The Garments Order & Production Tracker — overview of production
          workflow from order intake to dispatch.
        </p>
      </div>

      {STEPS.map((s, i) => (
        <StepCard step={s} index={i} key={s.title} />
      ))}
    </div>
  );
};

export default Steps;
