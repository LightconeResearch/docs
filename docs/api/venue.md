# Venue selection has moved to compute

The former `lightcone.engine.venue` module has been replaced by
[`lightcone.engine.compute`](compute.md). Execution now requires an explicit
allocation ID; it does not infer a venue from Slurm environment variables or
start a local cluster automatically.

For usage, see [Compute and clusters](../user/cluster.md) and the
[`lc compute` reference](../cli/compute.md). For implementation details, see
[compute internals](compute.md).
