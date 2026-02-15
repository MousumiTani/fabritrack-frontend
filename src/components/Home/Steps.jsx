import React from "react";
import sewing from "../../assets/sewing.mp4";
import cutting from "../../assets/cutting.mp4";
import procurement from "../../assets/procurement.mp4";
import order from "../../assets/order.mp4";
import planning from "../../assets/planning.mp4";
import packing from "../../assets/packing.mp4";
import qc from "../../assets/qc.mp4";
import dispatch from "../../assets/dispatch.mp4";

const STEPS = [
  {
    title: "Order Intake",
    text: "Receive buyer PO, upload tech pack & size specs. Create order in FabriTrack, assign order ID and deadlines.",
    video: order,
  },
  {
    title: "Tech Pack & Planning",
    text: "Upload tech pack, create production plan and break order into batches with timings for each stage.",
    video: planning,
  },
  {
    title: "Material Procurement & Inventory",
    text: "Check inventory, create procurement for shortages, receive and scan materials into stock reserved for the order.",
    video: procurement,
  },
  {
    title: "Cutting",
    text: "Generate marker/cutting lists, log cutting output and material used. System updates inventory and yield reports.",
    video: cutting,
  },
  {
    title: "Sewing (Assembly)",
    text: "Move bundles to sewing lines, log progress per bundle, track WIP and operator performance, flag defects.",
    video: sewing,
  },
  {
    title: "Quality Control",
    text: "In-line and final QC checks recorded with pass/fail and reasons; failed items are routed for rework.",
    video: qc,
  },
  {
    title: "Finishing & Packing",
    text: "Trim, press and pack garments; print packing lists and labels; record cartons and quantities.",
    video: packing,
  },
  {
    title: "Dispatch & Reporting",
    text: "Create shipment, mark dispatched, update order status; review OEE, yield, delivery performance.",
    video: dispatch,
  },
];

const StepCard = ({ step, index }) => {
  const isEven = index % 2 !== 0;

  return (
    <section className="py-10 bg-[#FFF5E6] dark:bg-[#403530]">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`flex flex-col md:flex-row ${
            isEven ? "md:flex-row-reverse" : ""
          } gap-6 items-stretch`}
        >
          <div className="md:w-1/2 h-[320px] md:h-[360px] rounded-md overflow-hidden border border-[#D9BFA7] dark:border-[#5f4631]">
            <video
              src={step.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 h-[320px] md:h-[360px] flex">
            <div className="flex flex-col justify-center w-full p-6 rounded-md border border-[#D9BFA7] dark:border-[#5f4631] bg-white/70 dark:bg-black/30">
              <h3 className="text-xl font-semibold mb-3 text-[#5f4631] dark:text-[#f4ead8]">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-[#6e5443] dark:text-[#e9dccb] leading-relaxed">
                {step.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Steps = () => (
  <div>
    <div className="max-w-6xl mx-auto px-4 py-8 text-center">
      <h2>How FabriTrack Works</h2>
      <p className="text-[#6e5443] dark:text-[#e9dccb] max-w-2xl mx-auto">
        The garment production flow — from order intake to dispatch.
      </p>
    </div>

    {STEPS.map((step, index) => (
      <StepCard key={step.title} step={step} index={index} />
    ))}
  </div>
);

export default Steps;
